import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import {
  commitRateLimit,
  peekRateLimit,
  releaseRateLimit,
} from "@/lib/rate-limit";
import { isSingleEmoji, visitorMarkSchema } from "@/lib/schemas/visitor-tags";
import {
  getVisitorTagsSnapshot,
  recordMark,
  VISITOR_TAGS_CACHE_TAG,
} from "@/lib/visitor-tags";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CITY_RATE_LIMIT = { windowMs: 120_000, maxHits: 1 } as const;
const EMOJI_RATE_LIMIT = { windowMs: 60_000, maxHits: 10 } as const;

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "anonymous";
}

export async function GET() {
  const snapshot = await getVisitorTagsSnapshot();
  return NextResponse.json(snapshot, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = visitorMarkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid city or emoji." },
      { status: 400 }
    );
  }

  if (parsed.data.emoji && !isSingleEmoji(parsed.data.emoji)) {
    return NextResponse.json(
      { success: false, error: "Pick a single emoji." },
      { status: 400 }
    );
  }

  if (
    parsed.data.previousEmoji &&
    !isSingleEmoji(parsed.data.previousEmoji)
  ) {
    return NextResponse.json(
      { success: false, error: "Invalid previous emoji." },
      { status: 400 }
    );
  }

  const isCity = Boolean(parsed.data.city);
  const ip = clientIp(request);
  const limitKey = isCity
    ? `visitor-tags:city:${ip}`
    : `visitor-tags:emoji:${ip}`;
  const limitOptions = isCity ? CITY_RATE_LIMIT : EMOJI_RATE_LIMIT;

  // Reserve the slot synchronously (atomic on the event loop) so two concurrent
  // requests can't both pass the check; refund it below if persistence fails.
  const limit = peekRateLimit(limitKey, limitOptions);
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, error: "Slow down a little, try again in a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }
  commitRateLimit(limitKey, limitOptions);

  const result = await recordMark({
    city: parsed.data.city,
    emoji: parsed.data.emoji,
    previousEmoji: parsed.data.previousEmoji,
  });

  if (!result.ok) {
    releaseRateLimit(limitKey, limitOptions);
    const status = result.code === "invalid_input" ? 400 : 503;
    const payload: Record<string, unknown> = {
      success: false,
      code: result.code,
    };
    // Never leak DB internals/setup hints to visitors; surface them only in dev.
    if (process.env.NODE_ENV === "development") payload.error = result.message;
    return NextResponse.json(payload, { status });
  }

  revalidateTag(VISITOR_TAGS_CACHE_TAG, "max");

  return NextResponse.json(
    { success: true, ...result.snapshot },
    { headers: { "Cache-Control": "no-store" } }
  );
}
