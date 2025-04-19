import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function GET() {
  const { data, error } = await supabase
    .from("oru_events")
    .select("app_name");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const counts: Record<string, number> = {};
  data.forEach(row => {
    counts[row.app_name] = (counts[row.app_name] || 0) + 1;
  });

  const result = Object.entries(counts).map(([app_name, count]) => ({ app_name, count }));
  return NextResponse.json(result);
}
