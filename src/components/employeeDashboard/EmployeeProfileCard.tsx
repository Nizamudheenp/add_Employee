import React from "react";
import type { Employee } from "../../types/employee";

const Row: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div className="flex text-sm">
    <span className="w-32 text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value ?? "—"}</span>
  </div>
);

const EmployeeProfileCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      {/* Top section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        <div>
          <div className="w-28 h-28 rounded-full overflow-hidden border">
            {employee.basic.profilePicUrl ? (
              <img
                src={employee.basic.profilePicUrl}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-xl font-semibold">
                {employee.basic.firstName[0]}{employee.basic.lastName[0]}
              </div>
            )}
          </div>

          <div>
            <div className="mt-8">
              <button className="px-4 py-1.5 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                Leave Today
              </button>
            </div>
            <button className="mt-3 px-4 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Modify Profile
            </button>

          </div>

        </div>

        {/* Info */}
        <div className="ml-4">
          {/* Identity */}
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900 flex mb-2 items-center gap-2">
              {employee.basic.firstName} {employee.basic.lastName}
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">
                WFO
              </span>
            </h2>
            <p className="text-gray-600 text-sm">Employee ID : {employee.basic.employeeId}</p>
            <p className="text-gray-600 text-sm">Email ID : {employee.basic.email}</p>

          </div>
          <hr />
          <div className="grid grid-cols-3 gap-4 text-left mt-6 ">
            {/* Job Details */}
            <div className="space-y-1">
              <Row label="Ph. No" value={employee.personal.phone} />
              <Row label="Emg. No" value={employee.personal.emergencyPhone} />
              <Row label="Addr." value={employee.personal.address} />
              <Row label="Gen." value={employee.personal.gender} />
              <Row label="D.O.B." value={employee.personal.dob} />
              <Row label="Nat." value={employee.personal.nationality} />
              <Row label="BG" value={employee.personal.bloodGroup} />
            </div>

            {/* Bank + Job */}
            <div className="space-y-1">
              <Row label="Job Type" value={employee.basic.jobType} />
              <Row label="Designation" value={employee.basic.designation} />
              <Row label="Department" value={employee.basic.department} />
              <Row label="Rep Mgr / TL" value={employee.basic.repMgrTl} />
              <Row label="User Type" value={employee.basic.userType} />
              <Row label="Salary" value={`₹${employee.basic.salary}`} />
            </div>

            <div className="space-y-1">
              <Row label="Bank" value="State Bank of India" />
              <Row label="A/C No." value={employee.bank.accountNumber} />
              <Row label="A/C Holder" value={employee.bank.accountHolderName} />
              <Row label="Br. Name" value={employee.bank.branchName} />
              <Row label="IFSC" value={employee.bank.ifscCode} />
              <Row label="Attach. Docs" value="hsuh" />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileCard;
