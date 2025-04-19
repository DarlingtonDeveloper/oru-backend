import { Suspense } from "react";
import DistractionTable from "@/components/analytics/DistractionTable";
import DailyDistractionChart from "@/components/analytics/DailyDistractionChart";
import TopAppsChart from "@/components/analytics/TopAppsChart";
import DistractionHeatmap from "@/components/analytics/DistractionHeatmap";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Distraction Analytics</h1>
      <Suspense fallback={<p>Loading charts...</p>}>
        <TopAppsChart />
        <DailyDistractionChart />
        <DistractionHeatmap />
        <DistractionTable />
      </Suspense>
    </div>
  );
}
