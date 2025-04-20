"use client";
import useSWR from "swr";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-[#E1E8F0] rounded shadow-md">
        <p className="font-semibold text-[#252D38]">{label}</p>
        <p className="text-sm text-[#586A94]">{payload[0].value} distractions</p>
      </div>
    );
  }
  return null;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

export default function DailyDistractionChart() {
  const { data, error, isLoading } = useSWR("/api/analytics/daily-counts", fetcher);

  if (error)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0]">
        <h2 className="text-xl font-bold text-[#252D38] mb-2">Distractions per Day</h2>
        <div className="bg-[#FFF3F3] text-[#FF6B6B] p-4 rounded">Error loading data</div>
      </div>
    );

  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0] animate-pulse">
        <h2 className="text-xl font-bold text-[#252D38] mb-2">Distractions per Day</h2>
        <div className="h-[300px] bg-[#F5F9FC] rounded"></div>
      </div>
    );

  const formattedData = data.map((item: any) => ({
    ...item,
    formattedDate: formatDate(item.date),
  }));

  formattedData.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0]">
      <h2 className="text-xl font-bold text-[#252D38] mb-4">Distractions per Day</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E1E8F0" />
            <XAxis dataKey="formattedDate" stroke="#586A94" fontSize={12} />
            <YAxis stroke="#586A94" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#087E8B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
