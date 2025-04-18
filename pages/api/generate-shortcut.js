import fs from 'fs';
import path from 'path';

function bufferReplaceFixed(buffer, search, replace) {
    const searchBuffer = Buffer.from(search, 'utf8');

    let paddedReplace = replace;
    if (replace.length < search.length) {
        paddedReplace = replace + ' '.repeat(search.length - replace.length);
    } else if (replace.length > search.length) {
        paddedReplace = replace.substring(0, search.length);
    }

    const replaceBuffer = Buffer.from(paddedReplace, 'utf8');
    const idx = buffer.indexOf(searchBuffer);
    if (idx === -1) return buffer;

    return Buffer.concat([
        buffer.subarray(0, idx),
        replaceBuffer,
        buffer.subarray(idx + searchBuffer.length),
    ]);
}

export default function handler(req, res) {
    const { delay = '180' } = req.query;

    try {
        const filePath = path.resolve('./data/Oru.shortcut');
        let buffer = fs.readFileSync(filePath);
        buffer = bufferReplaceFixed(buffer, '{{DELAY}}', delay.toString());

        res.setHeader('Content-Disposition', 'attachment; filename="oru.shortcut"');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.status(200).send(buffer);
    } catch (err) {
        console.error('Shortcut error:', err);
        res.status(500).json({ error: 'Shortcut generation failed' });
    }
}
