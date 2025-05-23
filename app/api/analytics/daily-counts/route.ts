import { NextResponse } from "next/server";
import { supabase } from '@/lib/supabase';
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function GET() {
  try {
    // Initialize auth client with cookies
    const authClient = createServerComponentClient({ cookies });

    // Get user session
    const { data: { session } } = await authClient.auth.getSession();

    // Return empty data if no user is authenticated
    if (!session?.user) {
      return NextResponse.json([]);
    }

    // Query events for the logged-in user
    const { data, error } = await supabase
      .from("doomscroll_logs")
      .select("triggered_at")
      .eq("user_uuid", session.user.id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json([]);
    }

    // Calculate counts per day
    const counts: Record<string, number> = {};
    (data || []).forEach(row => {
      const date = new Date(row.triggered_at).toISOString().split("T")[0];
      counts[date] = (counts[date] || 0) + 1;
    });

    const result = Object.entries(counts).map(([date, count]) => ({ date, count }));
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in daily-counts API:', error);
    return NextResponse.json([]);
  }
}