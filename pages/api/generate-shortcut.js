import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';

const padOrTrim = (str, length) => {
    if (str.length > length) return str.slice(0, length);
    if (str.length < length) return str + ' '.repeat(length - str.length);
    return str;
};

const replaceInBuffer = (buffer, search, replace) => {
    const searchBuf = Buffer.from(search, 'utf8');
    const replaceBuf = Buffer.from(padOrTrim(replace, search.length), 'utf8');
    const index = buffer.indexOf(searchBuf);
    if (index === -1) return buffer; // Not found
    return Buffer.concat([
        buffer.subarray(0, index),
        replaceBuf,
        buffer.subarray(index + searchBuf.length)
    ]);
};

export default async function handler(req, res) {
    const { token, app_name = 'bbb', delay = 'ccc' } = req.query;

    // Verify the token is valid
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        // Verify token and get user
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return res.status(401).json({ error: 'Invalid authentication token' });
        }

        // Read and modify the shortcut template
        const filePath = path.join(process.cwd(), 'public', 'template.shortcut');
        let buffer = fs.readFileSync(filePath);

        // Replace token, app_name and delay in the shortcut file
        buffer = replaceInBuffer(buffer, 'aaa', token);
        buffer = replaceInBuffer(buffer, 'bbb', app_name);
        buffer = replaceInBuffer(buffer, 'ccc', delay);

        // Send the modified shortcut file
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="oru.shortcut"');
        res.status(200).send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate shortcut' });
    }
}