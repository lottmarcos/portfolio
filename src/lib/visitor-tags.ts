import "server-only";

import { unstable_cache } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { CityTag, EmojiTag, VisitorTagsSnapshot } from "@/lib/types";

export type { CityTag, EmojiTag, VisitorTagsSnapshot };

export const VISITOR_TAGS_CACHE_TAG = "visitor-tags";

export type RecordMarkErrorCode = "not_configured" | "rpc_error" | "invalid_input";

export type RecordMarkResult =
  | { ok: true; snapshot: VisitorTagsSnapshot }
  | { ok: false; code: RecordMarkErrorCode; message: string };

const TOP_LIMIT = 200;
const CACHE_REVALIDATE_SECONDS = 30;

type RpcRow = {
  city?: string;
  count?: number;
  emoji?: string;
};

type RpcPayload = {
  top_cities?: RpcRow[] | null;
  top_emojis?: RpcRow[] | null;
};

function mapCityRows(rows: RpcRow[] | null | undefined): CityTag[] {
  if (!rows?.length) return [];
  return rows.map((row) => ({
    city: String(row.city ?? ""),
    count: Number(row.count ?? 0),
  }));
}

function mapEmojiRows(rows: RpcRow[] | null | undefined): EmojiTag[] {
  if (!rows?.length) return [];
  return rows.map((row) => ({
    emoji: String(row.emoji ?? ""),
    count: Number(row.count ?? 0),
  }));
}

function mapPayload(payload: RpcPayload): VisitorTagsSnapshot {
  return {
    topCities: mapCityRows(payload.top_cities),
    topEmojis: mapEmojiRows(payload.top_emojis),
  };
}

export async function getTopCities(limit = TOP_LIMIT): Promise<CityTag[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createAdminClient();
    const { data: cities, error: citiesError } = await supabase
      .from("visitor_city_stats")
      .select("city, display_city, visit_count")
      .order("visit_count", { ascending: false })
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (citiesError || !cities?.length) return [];

    return cities.map((row) => ({
      city: (row.display_city as string) || (row.city as string),
      count: row.visit_count as number,
    }));
  } catch {
    return [];
  }
}

export async function getTopEmojis(limit = TOP_LIMIT): Promise<EmojiTag[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("visitor_global_emojis")
      .select("emoji, count")
      .order("count", { ascending: false })
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data.map((row) => ({
      emoji: row.emoji as string,
      count: row.count as number,
    }));
  } catch {
    return [];
  }
}

async function fetchVisitorTagsSnapshot(
  limit = TOP_LIMIT
): Promise<VisitorTagsSnapshot> {
  const [topCities, topEmojis] = await Promise.all([
    getTopCities(limit),
    getTopEmojis(limit),
  ]);
  return { topCities, topEmojis };
}

export async function getVisitorTagsSnapshot(
  limit = TOP_LIMIT
): Promise<VisitorTagsSnapshot> {
  if (!isSupabaseConfigured()) {
    return { topCities: [], topEmojis: [] };
  }

  const cached = unstable_cache(
    () => fetchVisitorTagsSnapshot(limit),
    ["visitor-tags-snapshot", String(limit)],
    {
      tags: [VISITOR_TAGS_CACHE_TAG],
      revalidate: CACHE_REVALIDATE_SECONDS,
    }
  );

  return cached();
}

export async function recordMark(input: {
  city?: string;
  emoji?: string;
  previousEmoji?: string;
}): Promise<RecordMarkResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      code: "not_configured",
      message:
        "Supabase is not configured. Start the app with yarn dev (Docker) or set env vars.",
    };
  }

  const hasCity = Boolean(input.city?.trim());
  const hasEmoji = Boolean(input.emoji?.trim());
  if (!hasCity && !hasEmoji) {
    return {
      ok: false,
      code: "invalid_input",
      message: "Provide a city or an emoji.",
    };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.rpc("record_visitor_mark", {
      p_city: hasCity ? input.city!.trim() : null,
      p_emoji: hasEmoji ? input.emoji!.trim() : null,
      p_previous_emoji: input.previousEmoji?.trim() || null,
    });

    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[visitor-tags] record_visitor_mark failed:", error);
      }
      const hint =
        error.message?.includes("record_visitor_mark") ||
        error.message?.includes("does not exist")
          ? " Database migration may be missing — run yarn db:reset."
          : "";
      return {
        ok: false,
        code: "rpc_error",
        message: `${error.message || "RPC failed."}${hint}`,
      };
    }

    return { ok: true, snapshot: mapPayload(data as RpcPayload) };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (process.env.NODE_ENV === "development") {
      console.error("[visitor-tags] recordMark threw:", err);
    }
    return { ok: false, code: "rpc_error", message };
  }
}
