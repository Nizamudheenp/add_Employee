import React from "react";


export interface LeaveSummary {
    totalAllowed: number;
    taken: number;
    remaining: number;
    absentDays: number;
    upcoming?: { date: string; type: string }[];
}


const StatRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="flex items-center justify-between py-2">
        <span className="text-gray-600 text-sm">{label}</span>
        <span className="font-semibold text-gray-900">{value}</span>
    </div>
);


const LeavesDetails: React.FC<{ leaves: LeaveSummary | null }> = ({ leaves }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-base font-semibold text-gray-900">Leaves Details</h3>
            <p className="text-xs text-gray-500 mb-4">Overview of your leave balance</p>


            <div className="rounded-2xl border border-gray-100 p-4 bg-gray-50">
                <StatRow label="Total Allowed" value={leaves?.totalAllowed ?? "—"} />
                <div className="h-px bg-gray-100" />
                <StatRow label="Taken" value={leaves?.taken ?? "—"} />
                <div className="h-px bg-gray-100" />
                <StatRow label="Remaining" value={leaves?.remaining ?? "—"} />
                <div className="h-px bg-gray-100" />
                <StatRow label="Absents" value={leaves?.absentDays ?? "—"} />
            </div>


            <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Upcoming</h4>
                <ul className="space-y-2">
                    {(leaves?.upcoming ?? []).slice(0, 3).map((u, idx) => (
                        <li key={idx} className="flex items-center justify-between text-sm bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                            <span className="text-gray-700">{u.type}</span>
                            <span className="text-gray-500">{u.date}</span>
                        </li>
                    ))}
                    {(!leaves?.upcoming || leaves.upcoming.length === 0) && (
                        <li className="text-sm text-gray-500 bg-gray-50 border border-dashed border-gray-200 rounded-xl px-3 py-4 text-center">
                            No upcoming leaves
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};


export default LeavesDetails;