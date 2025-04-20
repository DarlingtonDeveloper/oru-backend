"use client";
import React, { useMemo } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getTealShade = (count: number, max: number) => {
  const intensity = count / max;
  if (intensity === 0) return "bg-[#F5F9FC]";
  if (intensity < 0.25) return "bg-[#C8EDEE]";
  if (intensity < 0.5) return "bg-[#5AB1BB] text-white";
  if (intensity < 0.75) return "bg-[#087E8B] text-white";
  return "bg-[#065C64] text-white";
};

export default function DistractionHeatmap() {
  const { data, error, isLoading } = useSWR("/api/analytics/heatmap", fetcher);

  const { processedData, maxCount } = useMemo(() => {
    if (!data) return { processedData: {}, maxCount: 0 };
    let max = 0;
    const processed: Record<string, Record<number, number>> = {};

    for (const day of DAYS_OF_WEEK) {
      processed[day] = {};
      for (let h = 0; h < 24; h++) processed[day][h] = 0;
    }

    Object.entries(data).forEach(([day, hours]) => {
      Object.entries(hours as Record<string, number>).forEach(([h, c]) => {
        const hour = parseInt(h);
        processed[day][hour] = c;
        if (c > max) max = c;
      });
    });

    return { processedData: processed, maxCount: max };
  }, [data]);

  if (error)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0]">
        <h2 className="text-xl font-bold text-[#252D38] mb-2">Distraction Heatmap</h2>
        <div className="bg-[#FFF3F3] text-[#FF6B6B] p-4 rounded">Error loading heatmap data</div>
      </div>
    );

  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0] animate-pulse">
        <h2 className="text-xl font-bold text-[#252D38] mb-2">Distraction Heatmap</h2>
        <div className="h-[300px] bg-[#F5F9FC] rounded"></div>
      </div>
    );

  const hourLabels = Array.from({ length: 24 }, (_, i) =>
    i === 0 ? "12a" : i === 12 ? "12p" : i < 12 ? `${i}a` : `${i - 12}p`
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#E1E8F0] overflow-x-auto">
      <h2 className="text-xl font-bold text-[#252D38] mb-4">Distraction Heatmap</h2>
      <div className="min-w-[900px]">
        <div className="grid grid-cols-[auto_repeat(24,minmax(32px,1fr))]">
          <div></div>
          {hourLabels.map((label, i) => (
            <div key={i} className="text-xs text-[#586A94] text-center py-1">
              {i % 3 === 0 ? label : ""}
            </div>
          ))}

          {DAYS_OF_WEEK.map((day) => (
            <React.Fragment key={day}>
              <div className="text-sm font-medium text-[#252D38] py-1 pr-2 border-r border-[#E1E8F0]">
                {day.slice(0, 3)}
              </div>
              {Array.from({ length: 24 }, (_, hour) => {
                const count = processedData[day]?.[hour] || 0;
                const cellStyle = getTealShade(count, maxCount);
                return (
                  <div
                    key={hour}
                    title={`${day} ${hour}:00 — ${count} distractions`}
                    className={`text-xs text-center px-1 py-1 border border-white ${cellStyle}`}
                  >
                    {count > 0 ? count : ""}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
