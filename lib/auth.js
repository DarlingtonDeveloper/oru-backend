import { supabase } from './supabase';
import { cookies } from 'next/headers';

export async function createSessionCookie(uuid) {
    // Create a simple session
    const session = {
        uuid,
        created: new Date().toISOString(),
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    };

    // Set session cookie
    cookies().set({
        name: 'oru_session',
        value: JSON.stringify(session),
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        sameSite: 'lax'
    });

    return session;
}

export async function getSession() {
    const sessionCookie = cookies().get('oru_session');

    if (!sessionCookie) {
        return null;
    }

    try {
        const session = JSON.parse(sessionCookie.value);

        // Check if the session is expired
        if (new Date(session.expires) < new Date()) {
            return null;
        }

        // Verify the UUID exists in database
        const { data, error } = await supabase
            .from('oru_events')
            .select('user_uuid')
            .eq('user_uuid', session.uuid)
            .limit(1);

        if (error || !data.length) {
            return null;
        }

        return session;
    } catch (error) {
        console.error('Error parsing session:', error);
        return null;
    }
}

export async function clearSession() {
    cookies().delete('oru_session');
}