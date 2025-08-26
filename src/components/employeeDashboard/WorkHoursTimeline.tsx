import React from "react";
import type { TimelineSegment } from "../../types/dashboard";

interface Props {
    series: TimelineSegment[];
}

const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, "0")}h ${m.toString().padStart(2, "0")}m`;
};

const WorkHoursTimeline: React.FC<Props> = ({ series }) => {
    const total = series.find((s) => s.label === "Total Working hours")?.value || 1;
    const productive = series.find((s) => s.label === "Productive Hours")?.value || 0;
    const breakTime = series.find((s) => s.label === "Break hours")?.value || 0;
    const overtime = series.find((s) => s.label === "Overtime hours")?.value || 0;

    const productivePct = (productive / total) * 100;
    const breakPct = (breakTime / total) * 100;
    const overtimePct = (overtime / total) * 100;
    const otherPct = Math.max(0, 100 - (productivePct + breakPct + overtimePct));

    const segments = [
        { key: "other", label: "Other", color: "#D1D5DB", pct: otherPct },
        { key: "productive", label: "Productive Hours", color: "#22C55E", pct: productivePct },
        { key: "break", label: "Break hours", color: "#FACC15", pct: breakPct },
        { key: "overtime", label: "Overtime hours", color: "#3B82F6", pct: overtimePct },
    ];

    const fade = 4;
    let cursor = 0;
    const stops: string[] = [];

    segments.forEach((seg, idx) => {
        const start = cursor;
        const end = cursor + seg.pct;
        const halfFade = Math.min(fade / 2, seg.pct / 2);

        const isFirst = idx === 0;
        const isLast = idx === segments.length - 1;

        const leftPos = isFirst ? 0 : +(start + halfFade).toFixed(4);
        const rightPos = isLast ? 100 : +(end - halfFade).toFixed(4);

        stops.push(`${seg.color} ${leftPos}%`);
        stops.push(`${seg.color} ${rightPos}%`);

        cursor = end;
    });

    const gradient = `linear-gradient(to right, ${stops.join(", ")})`;

    const colors: Record<string, string> = {
        "Total Working hours": "bg-gray-400",
        "Productive Hours": "bg-green-500",
        "Break hours": "bg-yellow-400",
        "Overtime hours": "bg-blue-500",
    };

    return (
        <div className="bg-white rounded-md shadow p-6">

            <div className="grid grid-cols-4 gap-4 text-center mb-6">
                {series.map((s, i) => (
                    <div key={i} className="flex flex-col items-start">
                        <div className="flex items-center justify-center space-x-2">
                            <div className={`w-6 h-6 rounded ${colors[s.label] ?? "bg-gray-300"}`} />
                            <p className="text-sm text-gray-500">{s.label}</p>
                        </div>
                        <p
                            className={`mt-1 font-semibold ${s.label.includes("Productive")
                                    ? "text-green-600"
                                    : s.label.includes("Break")
                                        ? "text-yellow-600"
                                        : s.label.includes("Overtime")
                                            ? "text-blue-600"
                                            : "text-gray-900"
                                }`}
                        >
                            {formatDuration(s.value)}
                        </p>
                    </div>
                ))}
            </div>

            {/*  Timeline bar */}
            <div className="relative w-full h-12 rounded-md overflow-hidden shadow">
                <div className="w-full h-full" style={{ background: gradient }} />
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
