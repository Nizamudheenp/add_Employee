import { useState } from "react";

const useAddEmployeeViewModel = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Basic Details", "Personal Details", "Bank Details"];

  const goNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return { steps, activeStep, setActiveStep, goNext, goBack };
};

export default useAddEmployeeViewModel;
