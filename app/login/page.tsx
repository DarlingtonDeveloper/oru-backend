'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function SimpleLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/dashboard';
    const { signIn, user, isLoading: authLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { error } = await signIn(email, password);

            if (error) {
                throw error;
            }

            // Successful login
            setError('');
            alert('Login successful! Click OK to go to dashboard.');
            router.push(redirectPath);
        } catch (err: any) {
            setError(err.message || 'Failed to log in');
        } finally {
            setIsLoading(false);
        }
    };

    // Show current auth state
    const authState = authLoading
        ? "Checking authentication..."
        : user
            ? `Logged in as ${user.email}. Click the button to go to dashboard.`
            : "Not logged in";

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Log in to Your Account</h1>

            {user && (
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4">
                    <p className="text-green-700 mb-2">You are already logged in as {user.email}</p>
                    <button
                        onClick={() => router.push(redirectPath)}
                        className="w-full bg-black text-white rounded py-2 font-medium"
                    >
                        Go to Dashboard
                    </button>
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="mb-4 p-3 bg-gray-100 rounded">
                    <strong>Auth State:</strong> {authState}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border rounded p-2 text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full border rounded p-2 text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded py-2 font-medium"
                        disabled={isLoading || !!user}
                    >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm space-y-2">
                    <p>
                        <Link href="/reset-password" className="text-gray-700 hover:underline">
                            Forgot your password?
                        </Link>
                    </p>
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-gray-700 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}