'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase-auth';

export default function OnboardPage() {
    const [apps, setApps] = useState<string[]>([]);
    const [delay, setDelay] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login?redirect=/onboard');
        }
    }, [user, authLoading, router]);

    const handleAppToggle = (app: string) => {
        setApps((prev) =>
            prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
        );
    };

    const handleGenerate = async () => {
        if (apps.length === 0) {
            setError('Please select at least one app to track');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Get authenticated user's token
            const { data: { session }, error: tokenError } = await supabaseClient.auth.getSession();

            if (tokenError || !session) {
                throw new Error('Authentication required');
            }

            // Generate the shortcut with user's token for authentication
            const query = new URLSearchParams({
                delay: delay.toString(),
                apps: apps.join(','),
                token: session.access_token
            });

            // Trigger download
            window.location.href = `/api/generate-shortcut?${query.toString()}`;
            setIsSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to generate shortcut');
        } finally {
            setIsLoading(false);
        }
    };

    const commonApps = ['Instagram', 'TikTok', 'Twitter', 'Reddit', 'YouTube', 'Facebook', 'LinkedIn', 'Snapchat'];

    if (authLoading) {
        return (
            <div className="max-w-md mx-auto p-6 text-center">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
                    <div className="h-24 bg-gray-200 rounded mb-4"></div>
                    <div className="h-24 bg-gray-200 rounded mb-4"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-md mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Login Required</h1>
                <p className="mb-6">You need to log in to set up your Oru tracker.</p>
                <Link href="/login?redirect=/onboard" className="bg-black text-white rounded py-2 px-4">
                    Log In
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">🎯 Set Up Your Tracker</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Configure Your Tracking</h2>

                {isSuccess && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                        Your shortcut is being downloaded. Install it on your device to start tracking!
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <label className="block mb-4">
                    <span className="text-sm font-medium">Time Threshold (minutes)</span>
                    <p className="text-xs text-gray-500 mb-2">
                        We'll wait this many minutes before allowing another distraction to be logged for the same app.
                    </p>
                    <input
                        type="number"
                        min={1}
                        max={60}
                        className="w-full border rounded p-2 mt-1"
                        value={delay}
                        onChange={(e) => setDelay(Number(e.target.value))}
                    />
                </label>

                <div className="mb-4">
                    <span className="text-sm font-medium block mb-2">Select apps to track:</span>
                    <div className="flex flex-wrap gap-2">
                        {commonApps.map((app) => (
                            <button
                                key={app}
                                onClick={() => handleAppToggle(app)}
                                className={`border px-3 py-2 rounded-lg text-sm transition-colors ${apps.includes(app)
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {app}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    className="w-full bg-black text-white rounded py-2 text-lg font-medium"
                    disabled={isLoading}
                >
                    {isLoading ? 'Generating...' : 'Generate Shortcut'}
                </button>

                <div className="mt-4 text-center text-sm text-gray-500">
                    <Link href="/dashboard" className="text-blue-600 hover:underline">
                        View your dashboard
                    </Link>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">How to Use</h2>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li>Download and install the shortcut on your iOS device</li>
                    <li>Add it to your home screen for easy access</li>
                    <li>Whenever you catch yourself mindlessly scrolling in a distracting app, tap the shortcut</li>
                    <li>The shortcut will log the current time and app</li>
                    <li>Check your dashboard to see patterns in your digital habits</li>
                </ol>
            </div>
        </div>
    );
}