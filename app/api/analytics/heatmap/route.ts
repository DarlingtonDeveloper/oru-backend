import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function GET() {
  const { data, error } = await supabase
    .from("oru_events")
    .select("triggered_at");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const heatmap: Record<string, Record<number, number>> = {};
  for (const row of data) {
    const date = new Date(row.triggered_at);
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const hour = date.getHours();
    heatmap[weekday] = heatmap[weekday] || {};
    heatmap[weekday][hour] = (heatmap[weekday][hour] || 0) + 1;
  }

  return NextResponse.json(heatmap);
}
