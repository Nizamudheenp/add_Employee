import React from "react";
import type { Employee } from "../../types/employee";


const Row: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
    <div className="flex items-center justify-between text-sm py-1">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-800 truncate ml-4">{value ?? "—"}</span>
    </div>
);


const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
        <div className="divide-y divide-gray-100">{children}</div>
    </div>
);


const EmployeeProfileCard: React.FC<{ employee: Employee }> = ({ employee }) => {
    const initials = `${employee.basic.firstName?.[0] ?? ""}${employee.basic.lastName?.[0] ?? ""}`.toUpperCase();


    return (
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
            {/* Avatar & identity */}
            <div className="flex items-center gap-4 md:w-1/3">
                {employee.basic.profilePicUrl ? (
                    <img src={employee.basic.profilePicUrl} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                        {initials || "👤"}
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        {employee.basic.firstName} {employee.basic.lastName}
                    </h2>
                    <p className="text-gray-500 text-sm">{employee.basic.email}</p>
                    <p className="text-xs text-gray-400">Employee ID: {employee.basic.employeeId}</p>
                    <button className="mt-2 px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                        Modify Profile
                    </button>
                </div>
            </div>


            {/* Job & Bank */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <SectionCard title="Job Details">
                    <Row label="Job Type" value={employee.basic.jobType} />
                    <Row label="Designation" value={employee.basic.designation} />
                    <Row label="Department" value={employee.basic.department} />
                    <Row label="Manager" value={employee.basic.repMgrTl} />
                    <Row label="User Type" value={employee.basic.userType} />
                </SectionCard>


                <SectionCard title="Bank Details">
                    <Row label="Account Holder" value={employee.bank.accountHolderName} />
                    <Row label="Account No" value={employee.bank.accountNumberMasked ?? employee.bank.accountNumber} />
                    <Row label="IFSC" value={employee.bank.ifscCode} />
                    <Row label="Branch" value={employee.bank.branchName} />
                    <Row label="Salary" value={`₹ ${employee.basic.salary}`} />
                </SectionCard>
            </div>
        </div>
    );
};


export default EmployeeProfileCard;