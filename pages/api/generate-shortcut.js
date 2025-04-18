import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { uuid, app_name = 'Instagram', delay = 180 } = req.query;

    if (!uuid) {
        return res.status(400).json({ error: 'UUID is required' });
    }

    try {
        const filePath = path.resolve('./data/Oru.shortcut');
        const buffer = fs.readFileSync(filePath); // Binary buffer

        // Binary-safe replacements
        let content = buffer.toString('latin1'); // Use latin1 to preserve binary structure

        content = content
            .replace(/F8C190-ABC0-4086-B119-D9484D7AD984/g, uuid)
            .replace(/{{APP_NAME}}/g, app_name)
            .replace(/{{DELAY}}/g, delay.toString());

        const patchedBuffer = Buffer.from(content, 'latin1');

        res.setHeader('Content-Disposition', 'attachment; filename="oru.shortcut"');
        res.setHeader('Content-Type', 'application/octet-stream'); // <- binary stream
        res.status(200).send(patchedBuffer);
    } catch (err) {
        console.error('Error generating shortcut:', err);
        res.status(500).json({ error: 'Failed to generate shortcut' });
    }
}
