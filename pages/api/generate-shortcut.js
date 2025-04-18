import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.resolve('./data/Oru.shortcut');

    try {
        const fileBuffer = fs.readFileSync(filePath);

        res.setHeader('Content-Disposition', 'attachment; filename="oru.shortcut"');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.status(200).send(fileBuffer);
    } catch (err) {
        console.error('Error reading shortcut:', err);
        res.status(500).json({ error: 'Failed to read shortcut' });
    }
}
