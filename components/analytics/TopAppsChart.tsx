"use client";
import useSWR from "swr";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-[#E1E8F0] rounded shadow-md">
        <p className="font-semibold text-[#252D38]">{payload[0].payload.app_name}</p>
        <p className="text-sm text-[#586A94]">{payload[0].value} distractions</p>
      </div>
    );
  }
  return null;
};

export default function TopAppsChart() {
  const { data, error, isLoading } = useSWR("/api/analytics/top-apps", fetcher);

  if (error)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0]">
        <h2 className="text-xl font-bold text-[#252D38] mb-2">Most Distracting Apps</h2>
        <div className="bg-[#FFF3F3] text-[#FF6B6B] p-4 rounded">Error loading data</div>
      </div>
    );

  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0] animate-pulse">
        <h2 className="text-xl font-bold text-[#252D38] mb-2">Most Distracting Apps</h2>
        <div className="h-[300px] bg-[#F5F9FC] rounded"></div>
      </div>
    );

  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0]">
      <h2 className="text-xl font-bold text-[#252D38] mb-4">Most Distracting Apps</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sortedData}
            margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E1E8F0" />
            <XAxis type="number" stroke="#586A94" fontSize={12} />
            <YAxis
              type="category"
              dataKey="app_name"
              stroke="#586A94"
              fontSize={13}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              name="Distractions"
              fill="#087E8B"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}