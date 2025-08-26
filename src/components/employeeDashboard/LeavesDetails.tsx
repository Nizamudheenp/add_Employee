import React from "react";
import type { LeaveSummary } from "../../types/dashboard";

const StatBox: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col items-left justify-center p-3 bg-white">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-lg font-semibold text-[#00A0E3]">{value}</span>
  </div>
);

const LeavesDetails: React.FC<{ leaves: LeaveSummary | null }> = ({ leaves }) => {
  return (
    <div className="bg-white rounded-md shadow p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base text-gray-700">Leaves Details</h3>
        <span className="px-2 py-0.5 border border-blue-200 rounded text-xs font-medium text-blue-400">
          2025
        </span>
      </div>
      <hr className="border-[#00A0E3]" />

      {/* Stats  */}
      <div className="grid grid-cols-2 gap-3 mt-1 mb-4">
        <StatBox label="Total Leaves" value={leaves?.totalAllowed ?? "—"} />
        <StatBox label="Taken" value={leaves?.taken ?? "—"} />
        <StatBox label="Absent" value={leaves?.absentDays ?? "—"} />
        <StatBox label="Request" value={leaves?.requests ?? "—"} />
        <StatBox label="Worked Days" value={leaves?.workedDays ?? "—"} />
        <StatBox label="Loss of Pay" value={leaves?.lossOfPay ?? "—"} />
      </div>

      <button
        className="w-[191px] h-[42px] border m-auto border-[#00A0E3] rounded-[10px] text-sm font-medium text-[#00A0E3] hover:border-[#00A0F3] transition"
      >
        Approve Leave
      </button>

    </div>
  );
};

export default LeavesDetails;
