import { NextResponse } from 'next/server';
import { clearSession } from '@/lib/auth';

export async function POST() {
    try {
        // Clear the session cookie
        await clearSession();

        return NextResponse.json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}