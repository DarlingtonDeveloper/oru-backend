"use client";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

const getAppColorClass = (app: string) => {
  if (app.toLowerCase().includes("instagram")) return "bg-[#FEE2E2] text-[#DC2626]";
  if (app.toLowerCase().includes("twitter")) return "bg-[#DBEAFE] text-[#2563EB]";
  if (app.toLowerCase().includes("tiktok")) return "bg-[#EDE9FE] text-[#7C3AED]";
  return "bg-[#F1F5F9] text-[#334155]";
};

export default function DistractionTable() {
  const { data, error, isLoading } = useSWR("/api/analytics/logs", fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (error)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0]">
        <h2 className="text-xl font-bold text-[#252D38] mb-2">All Distraction Logs</h2>
        <div className="bg-[#FFF3F3] text-[#FF6B6B] p-4 rounded">Error loading logs</div>
      </div>
    );

  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0] animate-pulse">
        <h2 className="text-xl font-bold text-[#252D38] mb-2">All Distraction Logs</h2>
        <div className="h-[300px] bg-[#F5F9FC] rounded"></div>
      </div>
    );

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0]">
      <h2 className="text-xl font-bold text-[#252D38] mb-4">All Distraction Logs</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="bg-[#F5F9FC]">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-[#586A94] border-b">Date & Time</th>
              <th className="px-4 py-3 text-sm font-medium text-[#586A94] border-b">App</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((log: any, i: number) => (
              <tr key={i} className="hover:bg-[#F9FAFB]">
                <td className="px-4 py-3 border-b text-sm text-[#252D38]">{formatDateTime(log.triggered_at)}</td>
                <td className="px-4 py-3 border-b">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${getAppColorClass(log.app_name)}`}>
                    {log.app_name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-[#586A94]">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-[#E1E8F0] rounded disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-sm rounded font-medium ${currentPage === pageNum
                    ? "bg-[#087E8B] text-white"
                    : "border border-[#E1E8F0] hover:bg-[#F5F9FC]"
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-[#E1E8F0] rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}