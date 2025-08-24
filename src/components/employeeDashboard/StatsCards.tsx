import React from "react";
import type { DashStats } from "../../types/dashboard";

const StatCard: React.FC<{ value: string; label: string; color?: string }> = ({ value, label, color }) => (
  <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
    <span className={`text-xl font-semibold ${color ?? "text-gray-900"}`}>{value}</span>
    <span className="text-xs text-gray-500 mt-1">{label}</span>
  </div>
);

const StatsCards: React.FC<{ stats: DashStats | null }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <StatCard value={stats?.todayHours ?? "—"} label="Total Hours Today" color="text-blue-600" />
      <StatCard value={stats?.weekHours ?? "—"} label="Total Hours Week" color="text-purple-600" />
      <StatCard value={stats?.monthHours ?? "—"} label="Total Hours Month" color="text-pink-600" />
      <StatCard value={stats?.overtimeHours ?? "—"} label="Overtime Month" color="text-red-600" />
    </div>
  );
};

export default StatsCards;
