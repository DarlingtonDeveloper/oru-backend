"use client";
import useSWR from "swr";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TopAppsChart() {
  const { data, error } = useSWR("/api/analytics/top-apps", fetcher);

  if (error) return <div>Error loading top apps</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full h-[300px]">
      <h2 className="text-xl font-semibold mb-2">Most Distracting Apps</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="app_name" />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
