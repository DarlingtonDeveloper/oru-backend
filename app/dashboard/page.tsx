'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase-auth";
import TopAppsChart from "@/components/analytics/TopAppsChart";
import DistractionTable from "@/components/analytics/DistractionTable";
import DailyDistractionChart from "@/components/analytics/DailyDistractionChart";
import DistractionHeatmap from "@/components/analytics/DistractionHeatmap";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [testResult, setTestResult] = useState<string>("");
  const [apiData, setApiData] = useState<any>(null);
  const [stats, setStats] = useState<{
    totalDistractions: number;
    mostUsedApp: string | null;
  }>({
    totalDistractions: 0,
    mostUsedApp: null,
  });

  // Check auth state and get stats
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

        // If user is authenticated, fetch stats
        if (user) {
          fetchStats();
        }
      } catch (err: any) {
        setTestResult(`Error checking auth: ${err.message}`);
      }
    }

    checkAuth();
  }, [user]);

  // Fetch stats directly using POST with user ID
  const fetchStats = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/direct-data-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });

      const data = await response.json();

      if (data.success) {
        // Get total distractions
        const totalDistractions = data.records_found;

        // Get most used app
        let appCounts: Record<string, number> = {};
        data.data.forEach((item: any) => {
          appCounts[item.app_name] = (appCounts[item.app_name] || 0) + 1;
        });

        let mostUsedApp = null;
        let maxCount = 0;

        Object.entries(appCounts).forEach(([app, count]) => {
          if (count > maxCount) {
            mostUsedApp = app;
            maxCount = count;
          }
        });

        setStats({
          totalDistractions,
          mostUsedApp
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p>Loading authentication state...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
      </div>
    );
  }

  // Logged in - show dashboard
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="p-4 bg-gray-100 rounded-lg mb-6">
          <p className="font-medium">Welcome, {user.email}!</p>
          <p className="text-sm text-gray-600 mt-1">User ID: {user.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Total Distractions</h2>
            <p className="text-3xl font-bold">{stats.totalDistractions}</p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Most Used App</h2>
            <p className="text-3xl font-bold">{stats.mostUsedApp || 'None'}</p>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Refresh Data
          </button>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg mt-6">
          <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
          <pre className="text-sm bg-gray-200 p-3 rounded overflow-auto">
            {JSON.stringify({ user, sessionInfo, testResult, apiData }, null, 2)}
          </pre>
        </div>
      </div>

      {/* Analytics Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TopAppsChart />
        <DailyDistractionChart />
      </div>

      <div className="mb-6">
        <DistractionHeatmap />
      </div>

      <div className="mb-6">
        <DistractionTable />
      </div>
    </div>
  );
}