import fs from 'fs';
import path from 'path';
import bplistParser from 'bplist-parser';
import bplistCreator from 'bplist-creator';

export default async function handler(req, res) {
    const { uuid, app_name = 'Instagram', delay = 180 } = req.query;

    if (!uuid) {
        return res.status(400).json({ error: 'UUID is required' });
    }

    try {
        const filePath = path.resolve('./data/Oru.shortcut');
        const buffer = fs.readFileSync(filePath);

        // Parse plist (returns an array of objects)
        const [parsed] = bplistParser.parseBuffer(buffer);

        // Traverse and patch the parsed structure
        const json = JSON.parse(JSON.stringify(parsed)); // clone

        // ⛏ inject your values here based on placeholder markers
        // Example (you'll adjust based on real structure):
        const replaceInObject = (obj) => {
            for (let key in obj) {
                if (typeof obj[key] === 'string') {
                    if (obj[key].includes('F8C190')) obj[key] = uuid;
                    if (obj[key].includes('{{APP_NAME}}')) obj[key] = app_name;
                    if (obj[key].includes('{{DELAY}}')) obj[key] = delay.toString();
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    replaceInObject(obj[key]);
                }
            }
        };

        replaceInObject(json);

        // Re-encode
        const newPlist = bplistCreator(json);
        res.setHeader('Content-Disposition', 'attachment; filename="oru.shortcut"');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.status(200).send(Buffer.from(newPlist));
    } catch (err) {
        console.error('Error generating shortcut:', err);
        res.status(500).json({ error: 'Failed to generate shortcut' });
    }
}
