import React from "react";
import type { TimelineSegment } from "../../types/dashboard";

interface Props {
    series: TimelineSegment[];
}

const WorkHoursTimeline: React.FC<Props> = ({ series }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Work Hours</h3>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 text-center mb-6">
                {series.slice(0, 4).map((s, i) => (
                    <div key={i}>
                        <p className="text-sm text-gray-500">{s.label}</p>
                        <p className={
                            i === 1 ? "text-green-600 font-semibold" :
                                i === 2 ? "text-yellow-600 font-semibold" :
                                    i === 3 ? "text-red-600 font-semibold" :
                                        "text-gray-900 font-semibold"
                        }>
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>


            {/* Timeline bar */}
            <div className="relative w-full h-6 rounded-xl overflow-hidden flex">
                <div className="bg-gray-300 w-3/12" />
                <div className="bg-green-500 w-5/12" />
                <div className="bg-yellow-400 w-1/12" />
                <div className="bg-red-400 flex-1" />
            </div>

            {/* Time labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>09:00</span>
                <span>11:00</span>
                <span>01:00</span>
                <span>03:00</span>
                <span>05:00</span>
                <span>07:00</span>
                <span>09:00</span>
            </div>
        </div>
    );
};

export default WorkHoursTimeline;
