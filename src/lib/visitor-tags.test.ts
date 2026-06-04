import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const mockFrom = vi.fn();
const mockRpc = vi.fn();

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    from: mockFrom,
    rpc: mockRpc,
  }),
}));

vi.mock("@/lib/supabase/env", () => ({
  isSupabaseConfigured: vi.fn(() => true),
}));

vi.mock("next/cache", () => ({
  unstable_cache: (fn: () => Promise<unknown>) => fn,
}));

import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  getTopCities,
  getTopEmojis,
  getVisitorTagsSnapshot,
  recordMark,
} from "@/lib/visitor-tags";

function queryBuilder<T extends { data: unknown; error: null }>(result: T) {
  const builder: Record<string, unknown> = {};
  for (const method of ["select", "order", "limit", "in"] as const) {
    builder[method] = vi.fn(() => builder);
  }
  builder.then = (
    onFulfilled: (v: T) => unknown,
    onRejected?: (e: unknown) => unknown
  ) => Promise.resolve(result).then(onFulfilled, onRejected);
  return builder;
}

describe("visitor-tags lib", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isSupabaseConfigured).mockReturnValue(true);
  });

  it("returns empty snapshot when not configured", async () => {
    vi.mocked(isSupabaseConfigured).mockReturnValue(false);
    await expect(getVisitorTagsSnapshot()).resolves.toEqual({
      topCities: [],
      topEmojis: [],
    });
  });

  it("recordMark returns not_configured when Supabase is off", async () => {
    vi.mocked(isSupabaseConfigured).mockReturnValue(false);
    await expect(recordMark({ city: "SP" })).resolves.toEqual({
      ok: false,
      code: "not_configured",
      message: expect.stringContaining("yarn dev"),
    });
  });

  it("recordMark returns invalid_input for empty body", async () => {
    await expect(recordMark({})).resolves.toEqual({
      ok: false,
      code: "invalid_input",
      message: expect.any(String),
    });
  });

  it("recordMark maps RPC payload to snapshot", async () => {
    mockRpc.mockResolvedValue({
      data: {
        top_cities: [{ city: "São Paulo", count: 3 }],
        top_emojis: [{ emoji: "🎉", count: 2 }],
      },
      error: null,
    });

    const result = await recordMark({ emoji: "🎉", previousEmoji: "👋" });
    expect(mockRpc).toHaveBeenCalledWith("record_visitor_mark", {
      p_city: null,
      p_emoji: "🎉",
      p_previous_emoji: "👋",
    });
    expect(result).toEqual({
      ok: true,
      snapshot: {
        topCities: [{ city: "São Paulo", count: 3 }],
        topEmojis: [{ emoji: "🎉", count: 2 }],
      },
    });
  });

  it("recordMark returns rpc_error when RPC fails", async () => {
    mockRpc.mockResolvedValue({
      data: null,
      error: { message: "function record_visitor_mark does not exist" },
    });

    const result = await recordMark({ emoji: "🎉" });
    expect(result).toMatchObject({
      ok: false,
      code: "rpc_error",
      message: expect.stringContaining("does not exist"),
    });
  });

  it("recordMark sends city-only to RPC", async () => {
    mockRpc.mockResolvedValue({
      data: { top_cities: [], top_emojis: [] },
      error: null,
    });

    await recordMark({ city: "Lisbon" });
    expect(mockRpc).toHaveBeenCalledWith("record_visitor_mark", {
      p_city: "Lisbon",
      p_emoji: null,
      p_previous_emoji: null,
    });
  });

  it("getTopCities returns visit counts without emoji", async () => {
    mockFrom.mockImplementation((table: string) => {
      if (table === "visitor_city_stats") {
        return queryBuilder({
          data: [
            { city: "são paulo", display_city: "São Paulo", visit_count: 5 },
          ],
          error: null,
        });
      }
      return queryBuilder({ data: [], error: null });
    });

    const cities = await getTopCities(5);
    expect(cities).toEqual([{ city: "São Paulo", count: 5 }]);
  });

  it("getTopEmojis returns global emoji ranks", async () => {
    mockFrom.mockImplementation(() =>
      queryBuilder({
        data: [{ emoji: "🎉", count: 10 }],
        error: null,
      })
    );

    await expect(getTopEmojis(5)).resolves.toEqual([{ emoji: "🎉", count: 10 }]);
  });
});
