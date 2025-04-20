import React, { useMemo } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then(res => res.json());

// Define days of the week in order
const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Function to determine cell color based on count (grayscale only)
const getCellColor = (count, maxCount) => {
  if (count === 0) return "bg-gray-100";

  const intensity = Math.min(Math.max(count / maxCount, 0.1), 1);
  const colorValue = Math.round(255 - (intensity * 200)); // Higher counts = darker gray

  return `bg-[rgb(${colorValue},${colorValue},${colorValue})]`;
};

const DistractionHeatmap = () => {
  const { data, error, isLoading } = useSWR("/api/analytics/heatmap", fetcher);

  // Process the data for the heatmap
  const { processedData, maxCount } = useMemo(() => {
    if (!data) return { processedData: {}, maxCount: 0 };

    let max = 0;

    // Initialize all hours for all days to 0
    const processed = DAYS_OF_WEEK.reduce((acc, day) => {
      acc[day] = {};
      for (let hour = 0; hour < 24; hour++) {
        acc[day][hour] = 0;
      }
      return acc;
    }, {});

    // Fill in the actual data
    Object.entries(data).forEach(([day, hours]) => {
      Object.entries(hours).forEach(([hour, count]) => {
        processed[day][parseInt(hour)] = count;
        max = Math.max(max, count);
      });
    });

    return { processedData: processed, maxCount: max };
  }, [data]);

  if (error) return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">Distraction Heatmap</h2>
      <div className="bg-gray-100 text-gray-800 p-4 rounded">Error loading heatmap data</div>
    </div>
  );

  if (isLoading) return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-pulse">
      <h2 className="text-xl font-semibold mb-2">Distraction Heatmap</h2>
      <div className="h-[300px] bg-gray-200 rounded"></div>
    </div>
  );

  // Create hour labels
  const hourLabels = Array.from({ length: 24 }, (_, i) => {
    return i === 0 ? '12am' :
      i === 12 ? '12pm' :
        i < 12 ? `${i}am` :
          `${i - 12}pm`;
  });

  // Alternate rendering for small screens
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Distraction Heatmap</h2>
      <div className="min-w-full">
        <div className="grid grid-cols-[auto_repeat(24,minmax(30px,1fr))]">
          {/* Header row with hours */}
          <div className="bg-gray-100 font-medium p-2 border-b"></div>
          {hourLabels.map((hour, i) => (
            <div key={i} className="bg-gray-100 text-xs p-1 text-center border-b">
              {i % 3 === 0 ? hour : ""}
            </div>
          ))}

          {/* Data rows */}
          {DAYS_OF_WEEK.map(day => (
            <React.Fragment key={day}>
              <div className="font-medium p-2 border-b">{day.slice(0, 3)}</div>
              {Array.from({ length: 24 }, (_, hour) => {
                const count = processedData[day]?.[hour] || 0;

                // Calculate grayscale color based on count
                let colorClass;
                if (count === 0) {
                  colorClass = "bg-gray-100";
                } else {
                  const intensity = Math.min(Math.max(count / maxCount, 0.1), 1);
                  if (intensity < 0.33) colorClass = "bg-gray-200";
                  else if (intensity < 0.66) colorClass = "bg-gray-400";
                  else colorClass = "bg-gray-600";
                }

                return (
                  <div
                    key={hour}
                    className={`border border-white ${colorClass} text-xs text-center p-1 ${colorClass === "bg-gray-600" ? "text-white" : "text-black"}`}
                    title={`${day} ${hour}:00 - ${count} distractions`}
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
};

export default DistractionHeatmap;