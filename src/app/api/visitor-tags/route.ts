import { NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";
import { isSingleEmoji, visitorTagSchema } from "@/lib/schemas/visitor-tags";
import { getTopCities, recordVisit } from "@/lib/visitor-tags";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "anonymous";
}

export async function GET() {
  const topCities = await getTopCities(5);
  return NextResponse.json(
    { topCities },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: NextRequest) {
  // Rate limit: 1 submission per IP per 60s.
  const limit = checkRateLimit(`visitor-tags:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, error: "Slow down a little, try again in a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = visitorTagSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid city or emoji." },
      { status: 400 }
    );
  }

  if (!isSingleEmoji(parsed.data.emoji)) {
    return NextResponse.json(
      { success: false, error: "Pick a single emoji." },
      { status: 400 }
    );
  }

  const result = await recordVisit(parsed.data.city, parsed.data.emoji);
  if (!result) {
    return NextResponse.json(
      { success: false, error: "Couldn't save your mark right now." },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { success: true, count: result.count, topCities: result.topCities },
    { headers: { "Cache-Control": "no-store" } }
  );
}
