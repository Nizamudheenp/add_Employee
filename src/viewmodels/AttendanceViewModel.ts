import { useEffect, useState } from "react";
import { AttendanceService } from "../services/AttendanceService";
import { transformChartData } from "../utils/chartHelpers";

export function useAttendanceViewModel() {
  const [overall, setOverall] = useState(0);
  const [chartData, setChartData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const stats = await AttendanceService.fetchStats();
        setOverall(stats.overall);
        setChartData(transformChartData(stats.monthly));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { overall, chartData, loading };
}
