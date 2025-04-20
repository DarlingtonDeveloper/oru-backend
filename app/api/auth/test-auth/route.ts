import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
    try {
        // Initialize Supabase client with cookies
        const supabase = createServerComponentClient({ cookies });

        // Try to get the session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            return NextResponse.json({
                status: "error",
                message: error.message,
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

        // Return session info (excluding sensitive data)
        return NextResponse.json({
            status: "authenticated",
            user_email: session.user?.email,
            user_id: session.user?.id,
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