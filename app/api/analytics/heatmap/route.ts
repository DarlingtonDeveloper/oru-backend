import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export async function GET() {
  try {
    // Get the authenticated user from Supabase Auth
    const authClient = createServerComponentClient({ cookies });
    const { data: { session } } = await authClient.auth.getSession();

    // Return empty data if no user is authenticated
    if (!session?.user) {
      return NextResponse.json({});
    }

    // Query events for the logged-in user
    const { data, error } = await supabase
      .from("doomscroll_logs")
      .select("triggered_at")
      .eq("user_uuid", session.user.id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({});
    }

    // Process data into heatmap format
    const heatmap: Record<string, Record<number, number>> = {};
    for (const row of data || []) {
      const date = new Date(row.triggered_at);
      const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
      const hour = date.getHours();
      heatmap[weekday] = heatmap[weekday] || {};
      heatmap[weekday][hour] = (heatmap[weekday][hour] || 0) + 1;
    }

    return NextResponse.json(heatmap);
  } catch (error: any) {
    console.error('Error in heatmap API:', error);
    return NextResponse.json({});
  }
}