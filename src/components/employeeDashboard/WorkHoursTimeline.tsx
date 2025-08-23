import React, { useMemo } from "react";


const WorkHoursTimeline: React.FC<{ series: { label: string; value: number }[] }> = ({ series }) => {
    const max = useMemo(() => (series.length ? Math.max(...series.map(s => s.value)) : 0), [series]);


    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-semibold text-gray-900">Work Hours Timeline</h3>
                    <p className="text-xs text-gray-500">Daily hours overview</p>
                </div>
                <div className="text-xs text-gray-500">Last {series.length} days</div>
            </div>


            {/* Bars */}
            <div className="grid grid-cols-7 md:grid-cols-14 gap-2 items-end h-40">
                {series.map((s, idx) => {
                    const h = max ? Math.round((s.value / max) * 100) : 0;
                    return (
                        <div key={idx} className="flex flex-col items-center justify-end">
                            <div
                                className="w-full rounded-t-lg bg-indigo-500/80"
                                style={{ height: `${h}%` }}
                                title={`${s.label}: ${s.value} hrs`}
                            />
                            <span className="text-[10px] text-gray-500 mt-1">{s.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default WorkHoursTimeline;