import React from "react";
import type { LeaveSummary } from "../../types/dashboard";

const StatBox: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow">
    <span className="text-lg font-semibold text-gray-900">{value}</span>
    <span className="text-xs text-gray-500">{label}</span>
  </div>
);

const LeavesDetails: React.FC<{ leaves: LeaveSummary | null }> = ({ leaves }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-900">Leaves Details</h3>
        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
          2025
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatBox label="Total Leaves" value={leaves?.totalAllowed ?? "—"} />
        <StatBox label="Taken" value={leaves?.taken ?? "—"} />
        <StatBox label="Absent" value={leaves?.absentDays ?? "—"} />
        <StatBox label="Request" value={leaves?.requests ?? "—"} />
        <StatBox label="Worked Days" value={leaves?.workedDays ?? "—"} />
        <StatBox label="Loss of Pay" value={leaves?.lossOfPay ?? "—"} />
      </div>

      {/* Footer */}
      <button className="mt-auto px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
        Approve Leave
      </button>
    </div>
  );
};

export default LeavesDetails;
