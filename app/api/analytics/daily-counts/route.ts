import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function GET() {
  const { data, error } = await supabase
    .from("oru_events")
    .select("triggered_at");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const counts: Record<string, number> = {};
  data.forEach(row => {
    const date = new Date(row.triggered_at).toISOString().split("T")[0];
    counts[date] = (counts[date] || 0) + 1;
  });

  const result = Object.entries(counts).map(([date, count]) => ({ date, count }));
  return NextResponse.json(result);
}
