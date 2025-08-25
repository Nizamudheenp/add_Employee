import React from "react";
import type { DashStats } from "../../types/dashboard";

const StatCard: React.FC<{ value: string; label: string; color?: string }> = ({ value, label, color }) => (
  <div className="bg-white rounded-md shadow p-6 flex flex-col h-[150px] justify-center items-left">
    <span className={`text-xl font-semibold ${color ?? "text-gray-900"}`}>{value}</span>
    <span className="text-xs text-gray-500 mt-1 tracking-[0.18em]">{label}</span>
  </div>
);

const StatsCards: React.FC<{ stats: DashStats | null }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard value={stats?.todayHours ?? "—"} label="Total Hours Today"  />
      <StatCard value={stats?.weekHours ?? "—"} label="Total Hours Week"  />
      <StatCard value={stats?.monthHours ?? "—"} label="Total Hours Month" />
      <StatCard value={stats?.overtimeHours ?? "—"} label="Overtime Month"  />
    </div>
  );
};

export default StatsCards;
