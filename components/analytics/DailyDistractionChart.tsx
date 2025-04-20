"use client";
import useSWR from "swr";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-md">
        <p className="font-medium">{label}</p>
        <p className="text-sm">{`${payload[0].value} distractions`}</p>
      </div>
    );
  }

  return null;
};

// Format date in a more readable way
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
};

export default function DailyDistractionChart() {
  const { data, error, isLoading } = useSWR("/api/analytics/daily-counts", fetcher);

  if (error) return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">Distractions per Day</h2>
      <div className="bg-gray-100 text-black p-4 rounded">Error loading data</div>
    </div>
  );

  if (isLoading) return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-pulse">
      <h2 className="text-xl font-semibold mb-2">Distractions per Day</h2>
      <div className="h-[300px] bg-gray-200 rounded"></div>
    </div>
  );

  // Format the data for better display
  const formattedData = data.map((item: any) => ({
    ...item,
    formattedDate: formatDate(item.date)
  }));

  // Sort data chronologically
  formattedData.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Distractions per Day</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="formattedDate" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              fill="#000000"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}