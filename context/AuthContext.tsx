'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    Session,
    User,
    AuthError
} from '@supabase/supabase-js';
import { supabaseClient } from '@/lib/supabase-auth';
import { useRouter } from 'next/navigation';

// Define types for the context
type AuthContextType = {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    isLoading: boolean;
    signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
};

// Define type for user profile
type UserProfile = {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    bio: string | null;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
    signUp: async () => ({ error: null }),
    signIn: async () => ({ error: null }),
    signOut: async () => { },
    refreshProfile: async () => { },
});

// Export the provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Create a default profile for a user
    const createDefaultProfile = async (userId: string, email: string) => {
        try {
            const displayName = email.split('@')[0];
            const newProfile = {
                id: userId,
                username: email,
                display_name: displayName,
                avatar_url: null,
                bio: null
            };

            const { data, error } = await supabaseClient
                .from('profiles')
                .insert([newProfile])
                .select()
                .single();

            if (error) {
                console.error('Error creating default profile:', error);
                // Return a minimal profile anyway to prevent UI errors
                return newProfile;
            }

            return data as UserProfile;
        } catch (err) {
            console.error('Unexpected error creating profile:', err);
            // Return a minimal profile to avoid UI errors
            return {
                id: userId,
                username: email || 'user',
                display_name: email ? email.split('@')[0] : 'User',
                avatar_url: null,
                bio: null
            };
        }
    };

    // Get or create user profile
    const getOrCreateProfile = async (userId: string, email: string) => {
        try {
            // Try to get the existing profile
            const { data, error } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            // If profile exists, return it
            if (data) {
                return data as UserProfile;
            }

            // If not found or error, create a new profile
            return await createDefaultProfile(userId, email);
        } catch (err) {
            console.error('Error in getOrCreateProfile:', err);
            // Return a minimal profile to avoid UI errors
            return {
                id: userId,
                username: email || 'user',
                display_name: email ? email.split('@')[0] : 'User',
                avatar_url: null,
                bio: null
            };
        }
    };

    // Initialize auth state
    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true);

            try {
                // Get current session
                const { data: { session } } = await supabaseClient.auth.getSession();
                setSession(session);
                setUser(session?.user || null);

                if (session?.user) {
                    const userProfile = await getOrCreateProfile(
                        session.user.id,
                        session.user.email || ''
                    );
                    setProfile(userProfile);
                }
            } catch (err) {
                console.error('Auth initialization error:', err);
            } finally {
                setIsLoading(false);
            }

            // Listen for auth changes
            const { data: { subscription } } = await supabaseClient.auth.onAuthStateChange(
                async (event, session) => {
                    setSession(session);
                    setUser(session?.user || null);

                    if (session?.user) {
                        const userProfile = await getOrCreateProfile(
                            session.user.id,
                            session.user.email || ''
                        );
                        setProfile(userProfile);
                    } else {
                        setProfile(null);
                    }

                    setIsLoading(false);

                    // Force a refresh of client-side data when auth changes
                    router.refresh();
                }
            );

            // Cleanup subscription
            return () => {
                subscription.unsubscribe();
            };
        };

        initializeAuth();
    }, [router]);

    // Sign up with email and password
    const signUp = async (email: string, password: string) => {
        const { error } = await supabaseClient.auth.signUp({
            email,
            password,
        });
        return { error };
    };

    // Sign in with email and password
    const signIn = async (email: string, password: string) => {
        const { error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    // Sign out
    const signOut = async () => {
        await supabaseClient.auth.signOut();
        router.push('/');
    };

    // Refresh profile data
    const refreshProfile = async () => {
        if (user) {
            const userProfile = await getOrCreateProfile(user.id, user.email || '');
            setProfile(userProfile);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                profile,
                isLoading,
                signUp,
                signIn,
                signOut,
                refreshProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Export a hook to use the auth context
export const useAuth = () => useContext(AuthContext);