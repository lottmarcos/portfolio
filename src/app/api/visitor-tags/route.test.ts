import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mockGetSnapshot = vi.fn();
const mockRecordMark = vi.fn();
const mockPeek = vi.fn();
const mockCommit = vi.fn();
const mockRelease = vi.fn();
const mockRevalidateTag = vi.fn();

vi.mock("@/lib/visitor-tags", () => ({
  getVisitorTagsSnapshot: (...args: unknown[]) => mockGetSnapshot(...args),
  recordMark: (...args: unknown[]) => mockRecordMark(...args),
  VISITOR_TAGS_CACHE_TAG: "visitor-tags",
}));

vi.mock("@/lib/rate-limit", () => ({
  peekRateLimit: (...args: unknown[]) => mockPeek(...args),
  commitRateLimit: (...args: unknown[]) => mockCommit(...args),
  releaseRateLimit: (...args: unknown[]) => mockRelease(...args),
}));

vi.mock("next/cache", () => ({
  revalidateTag: (...args: unknown[]) => mockRevalidateTag(...args),
}));

import { GET, POST } from "./route";

const snapshot = {
  topCities: [{ city: "São Paulo", count: 2 }],
  topEmojis: [{ emoji: "🎉", count: 5 }],
};

const okMark = { ok: true as const, snapshot };

describe("GET /api/visitor-tags", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetSnapshot.mockResolvedValue(snapshot);
  });

  it("returns top cities and global emojis", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual(snapshot);
  });
});

describe("POST /api/visitor-tags", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPeek.mockReturnValue({ ok: true, retryAfter: 0 });
    mockRecordMark.mockResolvedValue(okMark);
  });

  function post(body: unknown) {
    return POST(
      new NextRequest("http://localhost/api/visitor-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    );
  }

  it("rejects city and emoji in the same request", async () => {
    const res = await post({ city: "São Paulo", emoji: "🌊" });
    expect(res.status).toBe(400);
    expect(mockRecordMark).not.toHaveBeenCalled();
  });

  it("rate-limits city and emoji under distinct keys", async () => {
    await post({ city: "Lisbon" });
    await post({ emoji: "🎉" });

    expect(mockPeek).toHaveBeenCalledWith(
      expect.stringMatching(/^visitor-tags:city:/),
      expect.objectContaining({ maxHits: 1, windowMs: 120_000 })
    );
    expect(mockPeek).toHaveBeenCalledWith(
      expect.stringMatching(/^visitor-tags:emoji:/),
      expect.objectContaining({ maxHits: 10, windowMs: 60_000 })
    );
    expect(mockCommit).toHaveBeenCalledTimes(2);
  });

  it("accepts city only and reserves the rate-limit slot after success", async () => {
    const res = await post({ city: "Lisbon" });
    expect(res.status).toBe(200);
    expect(mockRecordMark).toHaveBeenCalledWith({
      city: "Lisbon",
      emoji: undefined,
      previousEmoji: undefined,
    });
    expect(mockCommit).toHaveBeenCalledWith(
      expect.stringMatching(/^visitor-tags:city:/),
      expect.objectContaining({ maxHits: 1 })
    );
    expect(mockRelease).not.toHaveBeenCalled();
    expect(mockRevalidateTag).toHaveBeenCalledWith("visitor-tags", "max");
  });

  it("accepts emoji with previousEmoji for swap under the emoji limit", async () => {
    const res = await post({ emoji: "🎉", previousEmoji: "👋" });
    expect(res.status).toBe(200);
    expect(mockRecordMark).toHaveBeenCalledWith({
      city: undefined,
      emoji: "🎉",
      previousEmoji: "👋",
    });
    expect(mockCommit).toHaveBeenCalledWith(
      expect.stringMatching(/^visitor-tags:emoji:/),
      expect.objectContaining({ maxHits: 10 })
    );
    expect(mockRevalidateTag).toHaveBeenCalledWith("visitor-tags", "max");
  });

  it("rejects empty body", async () => {
    const res = await post({});
    expect(res.status).toBe(400);
    expect(mockRecordMark).not.toHaveBeenCalled();
  });

  it("rejects invalid emoji", async () => {
    const res = await post({ emoji: "not-emoji" });
    expect(res.status).toBe(400);
  });

  it("returns 429 for city when peek is blocked", async () => {
    mockPeek.mockReturnValue({ ok: false, retryAfter: 30 });
    const res = await post({ city: "Lisbon" });
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("30");
    expect(mockRecordMark).not.toHaveBeenCalled();
    expect(mockCommit).not.toHaveBeenCalled();
  });

  it("returns 429 for emoji when its limit is blocked", async () => {
    mockPeek.mockReturnValue({ ok: false, retryAfter: 30 });
    const res = await post({ emoji: "🎉" });
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("30");
    expect(mockRecordMark).not.toHaveBeenCalled();
  });

  it("returns 503 with code but does not leak the DB message to visitors", async () => {
    mockRecordMark.mockResolvedValue({
      ok: false,
      code: "rpc_error",
      message: "function record_visitor_mark does not exist",
    });
    const res = await post({ emoji: "🎉" });
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body).toMatchObject({ success: false, code: "rpc_error" });
    // NODE_ENV is "test" here, so the raw message must not be present.
    expect(body.error).toBeUndefined();
    expect(mockRevalidateTag).not.toHaveBeenCalled();
  });

  it("refunds the reserved rate-limit slot when recordMark fails", async () => {
    mockRecordMark.mockResolvedValue({
      ok: false,
      code: "rpc_error",
      message: "RPC failed",
    });
    const res = await post({ city: "Lisbon" });
    expect(res.status).toBe(503);
    expect(mockCommit).toHaveBeenCalledWith(
      expect.stringMatching(/^visitor-tags:city:/),
      expect.anything()
    );
    expect(mockRelease).toHaveBeenCalledWith(
      expect.stringMatching(/^visitor-tags:city:/),
      expect.anything()
    );
  });
});
