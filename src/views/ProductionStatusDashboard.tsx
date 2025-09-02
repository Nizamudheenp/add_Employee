import React from "react";
import { useAttendanceViewModel } from "../viewmodels/AttendanceViewModel";
import { useLeaveViewModel } from "../viewmodels/LeaveViewModel";
import { Users, Users2 } from "lucide-react";
import SummaryCard from "../components/productioStatus/SummaryCard";
import Chart from "../components/productioStatus/Chart";

const ProductioStatus: React.FC = () => {
  const attendance = useAttendanceViewModel();
  const leaves = useLeaveViewModel();

  if (attendance.loading || leaves.loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100">
      {/* Attendance Section */}
      <div className="bg-white rounded-2xl shadow p-4">
        <SummaryCard
          title="Attendance"
          value={attendance.overall}
          subtitle="Overall Attendance"
          icon={<Users className="w-4 h-4 text-blue-500" />}
        />
        <Chart
          data={attendance.chartData}
          color="#3b82f6"
          rateTitle="Attendance Rate"
        />
      </div>

      {/* Leave Section */}
      <div className="bg-white rounded-2xl shadow p-4">
        <SummaryCard
          title="Leave"
          value={leaves.overall}
          subtitle="Overall Leaves"
          icon={<Users2 className="w-4 h-4 text-orange-500" />}
        />
        <Chart
          data={leaves.chartData}
          color="#f97316"
          rateTitle="Leave Rate"
        />
      </div>
    </div>
  );
};

export default ProductioStatus;
