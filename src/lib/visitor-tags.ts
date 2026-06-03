import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import type { CityTag } from "@/lib/types";

export type { CityTag };

/** Visitor Tags persist in Supabase. Degrade gracefully when unconfigured. */
function isConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function getTopCities(limit = 5): Promise<CityTag[]> {
  if (!isConfigured()) return [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("visitor_tags")
      .select("city, emoji, count")
      .order("count", { ascending: false })
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data as CityTag[];
  } catch {
    return [];
  }
}

export async function recordVisit(
  city: string,
  emoji: string
): Promise<{ count: number; topCities: CityTag[] } | null> {
  if (!isConfigured()) return null;

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.rpc("increment_visitor_tag", {
      p_city: city,
      p_emoji: emoji,
    });

    if (error) return null;

    const topCities = await getTopCities(5);
    const count = typeof data === "number" ? data : 0;
    return { count, topCities };
  } catch {
    return null;
  }
}
