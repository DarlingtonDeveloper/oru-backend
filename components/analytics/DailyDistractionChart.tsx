"use client";
import useSWR from "swr";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DailyDistractionChart() {
  const { data, error } = useSWR("/api/analytics/daily-counts", fetcher);

  if (error) return <div>Error loading daily counts</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full h-[300px]">
      <h2 className="text-xl font-semibold mb-2">Distractions per Day</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
