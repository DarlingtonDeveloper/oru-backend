"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DistractionTable() {
  const { data, error } = useSWR("/api/analytics/logs", fetcher);

  if (error) return <div>Error loading table</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">All Distraction Logs</h2>
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">App</th>
          </tr>
        </thead>
        <tbody>
          {data.map((log: any, i: number) => (
            <tr key={i}>
              <td className="border px-2 py-1">{log.triggered_at}</td>
              <td className="border px-2 py-1">{log.app_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
