"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DistractionHeatmap() {
  const { data, error } = useSWR("/api/analytics/heatmap", fetcher);

  if (error) return <div>Error loading heatmap</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Distraction Heatmap</h2>
      <pre className="overflow-x-auto bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
