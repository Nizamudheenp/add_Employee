import React from "react";
import { useEmployeeDashboardViewModel } from "../viewmodels/useEmployeeDashboardViewModel";
import LeavesDetails from "../components/employeeDashboard/LeavesDetails";
import StatsCards from "../components/employeeDashboard/StatsCards";
import WorkHoursTimeline from "../components/employeeDashboard/WorkHoursTimeline";
import EmployeeProfileCard from "../components/employeeDashboard/EmployeeProfileCard";


interface EmployeeDashboardProps {
    employeeId: string; 
}


const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ employeeId }) => {
    const { employee, leaves, stats, loading, error } = useEmployeeDashboardViewModel(employeeId);


    if (loading) {
        return (
            <div className="min-h-screen p-6 bg-gray-50">
                <div className="animate-pulse space-y-6">
                    <div className="h-28 bg-white rounded-2xl shadow" />
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="h-64 bg-white rounded-2xl shadow lg:col-span-1" />
                        <div className="space-y-6 lg:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="h-24 bg-white rounded-2xl shadow" />
                                <div className="h-24 bg-white rounded-2xl shadow" />
                                <div className="h-24 bg-white rounded-2xl shadow" />
                            </div>
                            <div className="h-72 bg-white rounded-2xl shadow" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen p-6 bg-gray-50">
                <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
                    {error}
                </div>
            </div>
        );
    }


    if (!employee) return null;


    return (
        <div className="min-h-screen space-y-6">
            <EmployeeProfileCard employee={employee} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <LeavesDetails leaves={leaves} />
                </div>


                <div className="lg:col-span-3 space-y-6">
                    <StatsCards stats={stats} />
                    <WorkHoursTimeline series={stats?.timeline ?? []} />
                </div>
            </div>
        </div>
    );
};


export default EmployeeDashboard;