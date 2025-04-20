'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase-auth";

export default function SimpleDashboard() {
  const { user, isLoading } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [testResult, setTestResult] = useState<string>("");
  const [apiData, setApiData] = useState<any>(null);

  // Simple debug function to check auth state
  useEffect(() => {
    async function checkAuth() {
      try {
        // Get auth session directly from Supabase
        const { data, error } = await supabaseClient.auth.getSession();
        setSessionInfo({
          hasSession: !!data.session,
          user: data.session?.user?.email || 'No user',
          error: error?.message || 'No error'
        });

        // Test API call
        const response = await fetch('/api/auth/test-auth');
        const result = await response.json();
        setApiData(result);
      } catch (err: any) {
        setTestResult(`Error checking auth: ${err.message}`);
      }
    }

    checkAuth();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p>Loading authentication state...</p>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
          <p className="mb-3">You are not logged in. Please log in to view your dashboard.</p>
          <Link href="/login" className="px-4 py-2 bg-black text-white rounded-md inline-block">
            Log In
          </Link>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg mt-6">
          <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
          <pre className="text-sm bg-gray-200 p-3 rounded overflow-auto">
            {JSON.stringify({ sessionInfo, testResult, apiData }, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  // Logged in - show dashboard
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <p className="font-medium">Welcome, {user.email}!</p>
        <p className="text-sm text-gray-600 mt-1">User ID: {user.id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Total Distractions</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Most Used App</h2>
          <p className="text-3xl font-bold">None</p>
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg mt-6">
        <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
        <pre className="text-sm bg-gray-200 p-3 rounded overflow-auto">
          {JSON.stringify({ user, sessionInfo, testResult, apiData }, null, 2)}
        </pre>
      </div>
    </div>
  );
}