export default async function handler(req, res) {
    const { uuid, apps = '', delay = 3 } = req.query;

    if (!uuid) {
        return res.status(400).json({ error: 'UUID is required' });
    }

    const config = {
        uuid,
        apps: apps.split(','),
        delay: Number(delay),
    };

    // TEMP: Return a fake .shortcut file (JSON format for now)
    const file = Buffer.from(JSON.stringify(config, null, 2));

    res.setHeader('Content-Disposition', 'attachment; filename="oru.shortcut.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(file);
}
