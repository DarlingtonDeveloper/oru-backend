"use client";
import useSWR from "swr";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-md">
        <p className="font-medium">{`${payload[0].payload.app_name}`}</p>
        <p className="text-sm">{`${payload[0].value} distractions`}</p>
      </div>
    );
  }

  return null;
};

export default function TopAppsChart() {
  const { data, error, isLoading } = useSWR("/api/analytics/top-apps", fetcher);

  if (error) return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Most Distracting Apps</h2>
      <div className="bg-red-50 text-red-700 p-4 rounded">Error loading data</div>
    </div>
  );

  if (isLoading) return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
      <h2 className="text-xl font-semibold mb-2">Most Distracting Apps</h2>
      <div className="h-[300px] bg-gray-200 rounded"></div>
    </div>
  );

  // Sort data by count in descending order
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Most Distracting Apps</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={sortedData} margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="app_name" width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              name="Distractions"
              fill="#4f46e5"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}