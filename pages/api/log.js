import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
    console.log('🔥 Incoming:', req.method, req.headers['content-type'], req.body);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { uuid, app_name } = req.body;

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuid || !app_name || !uuidRegex.test(uuid)) {
        return res.status(400).json({ error: 'Missing or invalid fields (uuid, app_name).' });
    }

    const { error } = await supabase.from('doomscroll_logs').insert({
        user_uuid: uuid,
        app_name,
        triggered_at: new Date().toISOString(),
    });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
}
