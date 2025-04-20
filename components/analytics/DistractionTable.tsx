"use client";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Format date in a more readable way
const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

export default function DistractionTable() {
  const { data, error, isLoading } = useSWR("/api/analytics/logs", fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (error) return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">All Distraction Logs</h2>
      <div className="bg-gray-100 text-gray-800 p-4 rounded">Error loading logs</div>
    </div>
  );

  if (isLoading) return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-pulse">
      <h2 className="text-xl font-semibold mb-2">All Distraction Logs</h2>
      <div className="h-[300px] bg-gray-200 rounded"></div>
    </div>
  );

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">All Distraction Logs</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border-b">Date & Time</th>
              <th className="px-4 py-3 border-b">App</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((log: any, i: number) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">{formatDateTime(log.triggered_at)}</td>
                <td className="px-4 py-3 border-b">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                    {log.app_name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded ${currentPage === pageNum
                    ? 'bg-black text-white'
                    : 'border hover:bg-gray-50'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}