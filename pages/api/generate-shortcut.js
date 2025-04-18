import fs from 'fs';
import path from 'path';

// Binary-safe buffer replacement
function bufferReplace(buffer, search, replace) {
    const searchBuffer = Buffer.from(search, 'utf8');
    const replaceBuffer = Buffer.from(replace, 'utf8');

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

        // Binary-safe replacements
        buffer = bufferReplace(buffer, 'F8C190-ABC0-4086-B119-D9484D7AD984', uuid);
        buffer = bufferReplace(buffer, '{{APP_NAME}}', app_name);
        buffer = bufferReplace(buffer, '{{DELAY}}', delay.toString());

        res.setHeader('Content-Disposition', 'attachment; filename="oru.shortcut"');
        res.setHeader('Content-Type', 'application/octet-stream'); // treat as binary
        res.status(200).send(buffer);
    } catch (err) {
        console.error('Error generating shortcut:', err);
        res.status(500).json({ error: 'Failed to generate shortcut' });
    }
}
