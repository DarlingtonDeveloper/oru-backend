import { NextResponse } from "next/server";
import { supabase } from '@/lib/supabase';
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function GET() {
    try {
        // Initialize auth client with cookies
        const authClient = createServerComponentClient({ cookies });

        // Get user session
        const { data: { session }, error: sessionError } = await authClient.auth.getSession();

        if (sessionError) {
            return NextResponse.json({
                status: "error",
                message: sessionError.message,
                has_session: false
            }, { status: 500 });
        }

        if (!session) {
            return NextResponse.json({
                status: "unauthenticated",
                message: "No valid session found",
                has_session: false
            });
        }

        // Check if the user has any records in the doomscroll_logs table
        const { data, error } = await supabase
            .from("doomscroll_logs")
            .select("user_uuid")
            .eq("user_uuid", session.user.id)
            .limit(1);

        if (error) {
            return NextResponse.json({
                status: "error",
                message: error.message,
                has_session: true,
                records_found: 0
            }, { status: 500 });
        }

        return NextResponse.json({
            status: "authenticated",
            user_email: session.user?.email,
            user_id: session.user?.id,
            records_found: data?.length || 0,
            has_session: true
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: err.message || "Unknown error",
            has_session: false
        }, { status: 500 });
    }
}