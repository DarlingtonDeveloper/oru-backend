'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase-auth';

export default function ProfilePage() {
    const { user, profile, refreshProfile, isLoading, signOut } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    // Load profile data
    useEffect(() => {
        if (profile) {
            setDisplayName(profile.display_name || '');
            setBio(profile.bio || '');
            setAvatarUrl(profile.avatar_url || '');
        }
    }, [profile]);

    // Handle file upload for avatar
    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files.length) return;

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user?.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        // Upload the file to Supabase Storage
        const { data, error } = await supabaseClient
            .storage
            .from('avatars')
            .upload(fileName, file);

        if (error) {
            setMessage({ text: `Error uploading avatar: ${error.message}`, type: 'error' });
            return;
        }

        // Get the public URL
        const { data: { publicUrl } } = supabaseClient
            .storage
            .from('avatars')
            .getPublicUrl(data.path);

        setAvatarUrl(publicUrl);
    };

    // Handle profile update
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        setIsUpdating(true);
        setMessage({ text: '', type: '' });

        try {
            const { error } = await supabaseClient
                .from('profiles')
                .update({
                    display_name: displayName,
                    bio,
                    avatar_url: avatarUrl,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;

            // Refresh profile data
            await refreshProfile();

            setMessage({ text: 'Profile updated successfully!', type: 'success' });
        } catch (error: any) {
            setMessage({ text: `Error updating profile: ${error.message}`, type: 'error' });
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-md mx-auto p-4">
                <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                {user && (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            {profile?.display_name?.charAt(0) || user.email?.charAt(0) || '?'}
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarUpload}
                                    />
                                </label>
                            </div>
                            <div>
                                <p className="font-medium">{user.email}</p>
                                <p className="text-sm text-gray-500">
                                    Member since {new Date(user.created_at || '').toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium mb-1">
                                Display Name
                            </label>
                            <input
                                id="displayName"
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full border rounded p-2"
                                placeholder="How should we call you?"
                            />
                        </div>

                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium mb-1">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full border rounded p-2"
                                rows={3}
                                placeholder="Tell us a bit about yourself..."
                            />
                        </div>

                        {message.text && (
                            <div className={`p-3 ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                                } rounded-md text-sm`}>
                                {message.text}
                            </div>
                        )}

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => signOut()}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Log Out
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-black text-white rounded font-medium"
                                disabled={isUpdating}
                            >
                                {isUpdating ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}