import React from "react";


export interface DashStats {
    todayHours: number;
    weekHours: number;
    monthHours: number;
    overtimeHours: number;
    timeline: { label: string; value: number }[]; 
}


const SmallStat: React.FC<{ title: string; value: string | number; foot?: string }>
    = ({ title, value, foot }) => (
        <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-xs text-gray-500">{title}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
            {foot && <p className="text-xs text-gray-400 mt-1">{foot}</p>}
        </div>
    );


const HighlightCard: React.FC<{ title: string; value: string; subtitle?: string }>
    = ({ title, value, subtitle }) => (
        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl shadow p-5">
            <p className="text-xs font-medium text-indigo-700">{title}</p>
            <p className="text-3xl font-semibold text-indigo-900 mt-1">{value}</p>
            {subtitle && <p className="text-xs text-indigo-600 mt-1">{subtitle}</p>}
        </div>
    );


const StatsCards: React.FC<{ stats: DashStats | null }> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SmallStat title="Today" value={`${stats?.todayHours ?? 0} hrs`} />
            <SmallStat title="This Week" value={`${stats?.weekHours ?? 0} hrs`} />
            <SmallStat title="This Month" value={`${stats?.monthHours ?? 0} hrs`} />
            <HighlightCard title="Overtime" value={`${stats?.overtimeHours ?? 0} hrs`} subtitle="Tracked automatically" />
        </div>
    );
};


export default StatsCards;