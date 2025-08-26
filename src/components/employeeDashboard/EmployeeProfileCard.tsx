import React from "react";
import type { Employee } from "../../types/employee";
import { FingerPrintIcon, PencilIcon } from "@heroicons/react/16/solid";
import { User2Icon } from "lucide-react";

const Row: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div className="grid grid-cols-[100px_15px_1fr] text-sm items-start leading-6 ">
    <span className=" text-gray-700">{label}</span>
    <span className="text-gray-400">:</span>
    <span className="font-sm text-[13px] text-gray-400">{value ?? "—"}</span>
  </div>
);

const EmployeeProfileCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        <div>
          <div className="w-[170px] h-[170px] rounded-full overflow-hidden border">
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

          <div className="flex flex-col items-center justify-center mt-7">
            <div>
              <button className="px-4 py-1.5 text-xs flex items-center gap-2">
                <FingerPrintIcon className="h-4 w-4 text-[#00A0E3]" />
                Leave Today
              </button>
            </div>
            <button className="mt-3 px-5 py-1 text-xs rounded-md bg-[#00A0E3] text-white hover:bg-[#00A0F3] transition flex items-center gap-2">
              <div className="relative w-5 h-5">
                <User2Icon className="absolute top-0 left-0 h-5 w-5 text-white" />
                <PencilIcon className="absolute bottom-0 right-0 h-3 w-3 text-blue-300" />
              </div>
              Modify Profile
            </button>
          </div>

        </div>

        <div className="ml-4">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700 flex mb-1 items-center ">
              {employee.basic.firstName} {employee.basic.lastName}
              <span className="text-xs font-medium text-[#94C21A]  px-2 py-0.5 rounded">
                WFO
              </span>
            </h2>
            <div className="flex gap-1 items-center ">
              <p className="text-gray-700 text-md w-28">Employee ID </p>
              <span className="text-gray-700">:</span>
              <p className="text-gray-700 text-md ml-1">{employee.basic.employeeId}</p>
            </div>

            <div className="flex gap-1 items-center">
              <p className="text-gray-600 text-sm w-28">Email ID </p>
              <span className="text-gray-600">:</span>
              <p className="text-gray-500 text-sm ml-1">{employee.basic.email}</p>
            </div>

          </div>

          <hr className="border-[#43C8FF]" />

          <div className="grid grid-cols-3 gap-6 text-left mt-6 ">
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
