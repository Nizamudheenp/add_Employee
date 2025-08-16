import React, { useState } from "react";
import BasicDetails from "./components/BasicDetails";
import PersonalDetails from "./components/PersonalDetails";
import MainLayout from "./components/layout/MainLayout";

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Basic Details", "Personal Details", "Bank Details"];

  const goNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <MainLayout>
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-700">
        Add New Employee
      </h2>

      <div className="flex border-b mb-3">
        {steps.map((step, index) => (
          <button
            key={step}
            onClick={() => setActiveStep(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeStep === index
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {step}
          </button>
        ))}
      </div>

      {activeStep === 0 && <BasicDetails onNext={goNext} />}
      {activeStep === 1 && <PersonalDetails onNext={goNext} onBack={goBack} />}
    </div>
    </MainLayout>
  );
};

export default App;
