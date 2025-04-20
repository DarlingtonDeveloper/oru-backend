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
  const [apiData, setApiData] = useState<any>(null);
  const [stats, setStats] = useState({
    totalDistractions: 0,
    mostUsedApp: null as string | null,
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data, error } = await supabaseClient.auth.getSession();
        setSessionInfo({
          hasSession: !!data.session,
          user: data.session?.user?.email || 'No user',
          error: error?.message || 'No error'
        });

        const response = await fetch('/api/auth/test-auth');
        const result = await response.json();
        setApiData(result);

        if (user) {
          fetchStats();
        }
      } catch (err: any) {
        console.error("Error checking auth:", err.message);
      }
    }

    checkAuth();
  }, [user]);

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
        const totalDistractions = data.records_found;
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

        setStats({ totalDistractions, mostUsedApp });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0]">
          <h1 className="text-2xl font-bold text-[#252D38] mb-4">Dashboard</h1>
          <div className="p-4 bg-[#F5F9FC] rounded-lg">
            <p className="text-sm text-[#586A94]">Loading authentication state...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0]">
          <h1 className="text-2xl font-bold text-[#252D38] mb-4">Dashboard</h1>
          <div className="p-4 bg-[#F5F9FC] rounded-lg mb-4">
            <p className="mb-3 text-[#586A94]">You are not logged in. Please log in to view your dashboard.</p>
            <Link href="/login" className="px-4 py-2 bg-[#087E8B] text-white rounded-md inline-block text-sm font-medium">
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0] mb-6">
        <h1 className="text-2xl font-bold text-[#252D38] mb-4">Welcome back</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-[#F5F9FC] border border-[#E1E8F0] rounded-lg">
            <p className="text-sm text-[#586A94] mb-1 font-medium">Total Distractions</p>
            <p className="text-3xl font-bold text-[#252D38]">{stats.totalDistractions}</p>
          </div>
          <div className="p-4 bg-[#F5F9FC] border border-[#E1E8F0] rounded-lg">
            <p className="text-sm text-[#586A94] mb-1 font-medium">Most Used App</p>
            <p className="text-3xl font-bold text-[#252D38]">{stats.mostUsedApp || '—'}</p>
          </div>
        </div>
      </div>

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