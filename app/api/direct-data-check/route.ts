import { NextResponse } from "next/server";
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        // Get all logs for this user
        const { data, error } = await supabase
            .from("doomscroll_logs")
            .select("*")
            .eq("user_uuid", userId)
            .order("triggered_at", { ascending: false });

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json({
                success: false,
                error: error.message
            }, { status: 500 });
        }

        // Calculate app statistics
        const appCounts: Record<string, number> = {};
        (data || []).forEach(row => {
            appCounts[row.app_name] = (appCounts[row.app_name] || 0) + 1;
        });

        // Get most used app
        let mostUsedApp = null;
        let maxCount = 0;

        Object.entries(appCounts).forEach(([app, count]) => {
            if (count > maxCount) {
                mostUsedApp = app;
                maxCount = count;
            }
        });

        return NextResponse.json({
            success: true,
            records_found: data?.length || 0,
            mostUsedApp,
            data: data || []
        });
    } catch (error: any) {
        console.error('Error in direct data check:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}