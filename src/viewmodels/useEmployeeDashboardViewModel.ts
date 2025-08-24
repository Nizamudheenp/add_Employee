import { useEffect, useState } from "react";
import { employeeService } from "../services/employeeService";
import type { Employee } from "../types/employee";
import type { DashStats, LeaveSummary } from "../types/dashboard";


export const useEmployeeDashboardViewModel = (employeeId: string) => {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [leaves, setLeaves] = useState<LeaveSummary | null>(null);
    const [stats, setStats] = useState<DashStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                const [emp, lvs, st] = await Promise.all([
                    employeeService.getEmployeeById(employeeId),
                    employeeService.getEmployeeLeaves(employeeId),
                    employeeService.getEmployeeStats(employeeId),
                ]);
                if (!mounted) return;
                const statsWithTimeline: DashStats = {
                    ...st,
                    timeline: st.timeline ?? [
                        { label: "Total Working hours", value: "12h 36m" },
                        { label: "Productive Hours", value: "08h 30m" },
                        { label: "Break hours", value: "01h 15m" },
                        { label: "Overtime hours", value: "04h 20m" },
                    ],
                };
                setEmployee(emp);
                setLeaves(lvs);
                setStats(statsWithTimeline);
            } catch (e: any) {
                if (!mounted) return;
                setError(e?.message ?? "Failed to load employee dashboard");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [employeeId]);


    return { employee, leaves, stats, loading, error };
};