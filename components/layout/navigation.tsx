'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function DarkNavigation() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, profile, signOut, isLoading } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => {
        return pathname === path ? 'bg-black text-white' : 'text-white hover:bg-gray-700';
    };

    return (
        <nav className="bg-gray-900 p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link href="/" className="font-bold text-xl flex items-center text-white">
                    🎯 Oru
                </Link>

                <div className="flex gap-2 items-center">
                    <Link
                        href="/dashboard"
                        className={`px-4 py-2 rounded-md transition ${isActive('/dashboard')}`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/onboard"
                        className={`px-4 py-2 rounded-md transition ${isActive('/onboard')}`}
                    >
                        Setup
                    </Link>

                    {!isLoading && (
                        <>
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-gray-700"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm overflow-hidden text-white">
                                            {profile?.avatar_url ? (
                                                <img
                                                    src={profile.avatar_url}
                                                    alt={profile.display_name || 'Profile'}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                profile?.display_name?.charAt(0) || user.email?.charAt(0) || '?'
                                            )}
                                        </div>
                                        <span className="hidden sm:inline">{profile?.display_name || user.email?.split('@')[0]}</span>
                                    </button>

                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Profile Settings
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    signOut();
                                                    setIsMenuOpen(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Link
                                        href="/login"
                                        className="px-4 py-2 rounded-md transition text-white hover:bg-gray-700"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="px-4 py-2 bg-black text-white rounded-md"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}