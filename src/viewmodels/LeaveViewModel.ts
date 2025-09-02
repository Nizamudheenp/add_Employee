import { useEffect, useState } from "react";
import { LeaveService } from "../services/LeaveService";
import { transformChartData } from "../utils/chartHelpers";

export function useLeaveViewModel() {
  const [overall, setOverall] = useState(0);
  const [chartData, setChartData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const stats = await LeaveService.fetchStats();
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
