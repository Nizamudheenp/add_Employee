import React from "react";
import { useAttendanceViewModel } from "../viewmodels/AttendanceViewModel";
import { useLeaveViewModel } from "../viewmodels/LeaveViewModel";
import { Users2 } from "lucide-react";
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
      {/* Attendance  */}
      <div className="bg-white rounded-2xl shadow p-4">
        <SummaryCard
          title="Attendance"
          value={attendance.overall}
        />

        <div className="flex justify-between items-center px-4 mb-8 text-sm text-gray-600">
          <div className="flex items-center">
            Overall Attendance
            <Users2 className="w-4 h-4 text-blue-500 ml-2" />
          </div>
          <div className="flex items-center">
            <div className="w-4 h-3 rounded-sm mr-2" style={{ backgroundColor: "#00A0E3" }}></div>
            Attendance Rate
          </div>
        </div>

        <Chart data={attendance.chartData} color="#00A0E3" />
      </div>

      {/* Leave  */}
      <div className="bg-white rounded-2xl shadow p-4">
        <SummaryCard
          title="Leave"
          value={leaves.overall}
        />

        <div className="flex justify-between items-center px-4 mb-2 text-sm text-gray-600">
          <div className="flex items-center">
            Overall Leaves
            <Users2 className="w-4 h-4 text-orange-500 ml-2" />
          </div>
          <div className="flex items-center">
            <div className="w-4 h-3 rounded-sm mr-1" style={{ backgroundColor: "#FD7F20" }}></div>
            Leave Rate
          </div>
        </div>

        <Chart data={leaves.chartData} color="#FD7F20" />
      </div>
    </div>
  );
};

export default ProductioStatus;
