import { useState } from "react";
import { employeeService, type BankDetailsPayload, type BasicDetailsPayload, type PersonalDetailsPayload } from "../services/employeeService";

const useAddEmployeeViewModel = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Basic Details", "Personal Details", "Bank Details"];

  const goNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

   const submitBasicDetails = async (payload: BasicDetailsPayload) => {
    return await employeeService.addBasicDetails(payload);
  };

  const submitPersonalDetails = async (payload: PersonalDetailsPayload) => {
    return await employeeService.addPersonalDetails(payload);
  };

   const submitBankDetails = async (payload: BankDetailsPayload) => {
    return await employeeService.addBankDetails(payload);
  };

  return { steps, activeStep, setActiveStep, goNext, goBack , submitBasicDetails ,submitPersonalDetails , submitBankDetails };
};

export default useAddEmployeeViewModel;
