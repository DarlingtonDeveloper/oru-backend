'use client';

import { useState } from 'react';

export default function OnboardPage() {
    const [uuid, setUuid] = useState('');
    const [apps, setApps] = useState<string[]>([]);
    const [delay, setDelay] = useState(3);

    const handleAppToggle = (app: string) => {
        setApps((prev) =>
            prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
        );
    };

    const handleGenerate = async () => {
        // You could fetch or generate the shortcut here
        const query = new URLSearchParams({
            uuid,
            delay: delay.toString(),
            apps: apps.join(','),
        });

        window.location.href = `/api/generate-shortcut?${query.toString()}`;
    };

    const commonApps = ['Instagram', 'TikTok', 'Twitter', 'Reddit', 'YouTube'];

    return (
        <main className="max-w-md mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">🎯 Oru Setup</h1>

            <label className="block">
                <span className="text-sm">Your UUID</span>
                <input
                    type="text"
                    className="w-full border rounded p-2 mt-1"
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)}
                    placeholder="Paste your UUID"
                />
            </label>

            <label className="block">
                <span className="text-sm">Time Threshold (minutes)</span>
                <input
                    type="number"
                    min={1}
                    className="w-full border rounded p-2 mt-1"
                    value={delay}
                    onChange={(e) => setDelay(Number(e.target.value))}
                />
            </label>

            <div>
                <span className="text-sm block mb-2">Select apps to track:</span>
                <div className="flex flex-wrap gap-2">
                    {commonApps.map((app) => (
                        <button
                            key={app}
                            onClick={() => handleAppToggle(app)}
                            className={`border px-3 py-1 rounded-full text-sm ${apps.includes(app) ? 'bg-black text-white' : 'bg-white text-black'
                                }`}
                        >
                            {app}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleGenerate}
                className="w-full bg-black text-white rounded py-2 text-lg"
            >
                Generate Shortcut
            </button>
        </main>
    );
}
