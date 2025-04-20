'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check auth state when component mounts
        checkAuth();

        // Listen for auth state changes
        function checkAuth() {
            if (!isLoading) {
                if (!user) {
                    // Not logged in, redirect to login
                    router.push('/login?redirect=' + window.location.pathname);
                } else {
                    // Logged in, set authorized to true
                    setAuthorized(true);
                }
            }
        }
    }, [user, isLoading, router]);

    // Show loading screen while checking auth
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // If authorized, show children
    return authorized ? <>{children}</> : null;
}