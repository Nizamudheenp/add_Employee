import React from "react";
import type { DashStats } from "../../types/dashboard";
import { Clock } from "lucide-react";

const StatCard: React.FC<{ 
  value: number; 
  total: number; 
  label: string; 
  iconColor: string;
}> = ({ value, total, label, iconColor }) => (
  <div className="bg-white rounded-md shadow p-6 flex flex-col h-[150px] justify-center">
    <div className="flex justify-between items-center">
      <span className="text-xl font-semibold">
        <span className="text-[#00A0E3]">{value}/</span>
        <span className="text-gray-700">{total}hrs</span>
      </span>
      <Clock className={`w-6 h-6 ${iconColor}`} />
    </div>
    <span className="text-xs text-gray-500 mt-2 tracking-[0.18em]">{label}</span>
  </div>
);

const StatsCards: React.FC<{ stats: DashStats | null }> = ({ stats }) => {
  if (!stats) return null;

  const totals = {
    today: 7,
    week: 42,
    month: 182,
    overtime: 182,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard value={stats.todayHours} total={totals.today} label="Total Hours Today" iconColor="text-green-500" />
      <StatCard value={stats.weekHours} total={totals.week} label="Total Hours Week" iconColor="text-red-800" />
      <StatCard value={stats.monthHours} total={totals.month} label="Total Hours Month" iconColor="text-orange-500" />
      <StatCard value={stats.overtimeHours} total={totals.overtime} label="Overtime Month" iconColor="text-red-500" />
    </div>
  );
};

export default StatsCards;
