import type { MonthlyData } from "../types/productionStatus";

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function transformChartData(data: MonthlyData[]) {
  return data.map((item) => {
    const monthIndex = new Date(item.month).getMonth();
    return {
      label: monthNames[monthIndex],
      value: item.count,
    };
  });
}
