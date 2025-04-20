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
      return NextResponse.json([]);
    }

    // Query events for the logged-in user
    const { data, error } = await supabase
      .from("doomscroll_logs")
      .select("*")
      .eq("user_uuid", session.user.id)
      .order("triggered_at", { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return the data or empty array if null
    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('Error in logs API:', error);
    // Return empty array instead of error for better frontend experience
    return NextResponse.json([]);
  }
}