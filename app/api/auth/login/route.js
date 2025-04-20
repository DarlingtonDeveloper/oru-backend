import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createSessionCookie } from '@/lib/auth';

export async function POST(request) {
    try {
        const { uuid } = await request.json();

        if (!uuid) {
            return NextResponse.json({ error: 'UUID is required' }, { status: 400 });
        }

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(uuid)) {
            return NextResponse.json({ error: 'Invalid UUID format' }, { status: 400 });
        }

        // Check if UUID exists in the database
        const { data, error } = await supabase
            .from('doomscroll_logs')
            .select('user_uuid')
            .eq('user_uuid', uuid)
            .limit(1);

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        if (!data || data.length === 0) {
            // For security, provide a generic error
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Create session
        const session = await createSessionCookie(uuid);

        return NextResponse.json({
            success: true,
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}