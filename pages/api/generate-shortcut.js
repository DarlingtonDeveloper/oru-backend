import fs from 'fs';
import path from 'path';

// Binary-safe buffer replacement that preserves byte length
function bufferReplaceFixed(buffer, search, replace) {
    const searchBuffer = Buffer.from(search, 'utf8');

    // Match length exactly
    let paddedReplace = replace;
    if (replace.length < search.length) {
        paddedReplace = replace + ' '.repeat(search.length - replace.length);
    } else if (replace.length > search.length) {
        paddedReplace = replace.substring(0, search.length);
    }

    const replaceBuffer = Buffer.from(paddedReplace, 'utf8');

    const idx = buffer.indexOf(searchBuffer);
    if (idx === -1) return buffer;

    const before = buffer.subarray(0, idx);
    const after = buffer.subarray(idx + searchBuffer.length);

    return Buffer.concat([before, replaceBuffer, after]);
}

export default async function handler(req, res) {
    const { uuid, app_name = 'Instagram', delay = 180 } = req.query;

    if (!uuid) {
        return res.status(400).json({ error: 'UUID is required' });
    }

    try {
        const filePath = path.resolve('./data/Oru.shortcut');
        let buffer = fs.readFileSync(filePath); // raw binary

        // Binary-safe replacements with fixed length
        buffer = bufferReplaceFixed(buffer, 'F8C190-ABC0-4086-B119-D9484D7AD984', uuid);
        buffer = bufferReplaceFixed(buffer, '{{APP_NAME}}', app_name);
        buffer = bufferReplaceFixed(buffer, '{{DELAY}}', delay.toString());

        res.setHeader('Content-Disposition', 'attachment; filename="oru.shortcut"');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.status(200).send(buffer);
    } catch (err) {
        console.error('Error generating shortcut:', err);
        res.status(500).json({ error: 'Failed to generate shortcut' });
    }
}