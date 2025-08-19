import React from "react";
import BasicDetails from "../components/employee/BasicDetails";
import PersonalDetails from "../components/employee/PersonalDetails";
import useAddEmployeeViewModel from "../viewmodels/useAddEmployeeViewModel";
import BankDetails from "../components/employee/BankDetails";

const AddEmployee: React.FC = () => {
  const { steps, activeStep, setActiveStep, goNext, goBack } = useAddEmployeeViewModel();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-700">
        Add New Employee
      </h2>

      {/* Tabs */}
      <div className="flex border-b mb-3">
        {steps.map((step, index) => (
          <button
            key={step}
            onClick={() => setActiveStep(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeStep === index
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Step Components */}
      {activeStep === 0 && <BasicDetails onNext={goNext} />}
      {activeStep === 1 && <PersonalDetails onNext={goNext} onBack={goBack} />}
      {activeStep === 2 && (<BankDetails onBack={goBack} onSubmitSuccess={() => alert("Employee Added Successfully")} />
      )}
    </div>
  );
};

export default AddEmployee;
