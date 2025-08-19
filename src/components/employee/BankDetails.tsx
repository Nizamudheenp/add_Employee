import React, { useState, type ChangeEvent, type FormEvent } from "react";
import useAddEmployeeViewModel from "../../viewmodels/useAddEmployeeViewModel";
import type { BankDetailsPayload } from "../../services/employeeService";

interface BankDetailsProps {
    onBack: () => void;
    onSubmitSuccess: () => void;
}

const BankDetails: React.FC<BankDetailsProps> = ({ onBack, onSubmitSuccess }) => {
    const { submitBankDetails } = useAddEmployeeViewModel();

    const [formData, setFormData] = useState<BankDetailsPayload>({
        accountNumber: "",
        confirmAccountNumber: "",
        ifscCode: "",
        branchName: "",
        accountHolderName: "",
        documents: null,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof BankDetailsPayload, string>>>({});

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, documents: e.target.files[0] });
        }
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof BankDetailsPayload, string>> = {};
        if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
        if (formData.accountNumber !== formData.confirmAccountNumber)
            newErrors.confirmAccountNumber = "Account numbers do not match";
        if (!formData.ifscCode) newErrors.ifscCode = "IFSC code is required";
        if (!formData.accountHolderName) newErrors.accountHolderName = "Account holder name required";
        if (!formData.documents) newErrors.documents = "Please attach required document";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const allFilled =
        formData.accountNumber &&
        formData.confirmAccountNumber &&
        formData.ifscCode &&
        formData.branchName &&
        formData.accountHolderName &&
        formData.documents;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            await submitBankDetails(formData);
            onSubmitSuccess();
        } catch (error) {
            console.error("Error submitting bank details:", error);
            alert("Failed to submit bank details. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Account Number</label>
                <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="w-full border rounded-md px-2 h-[80px] text-gray-700"
                />
                {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Account Number</label>
                <input
                    type="text"
                    name="confirmAccountNumber"
                    value={formData.confirmAccountNumber}
                    onChange={handleChange}
                    className="w-full border rounded-md px-2 h-[80px] text-gray-700"
                />
                {errors.confirmAccountNumber && (
                    <p className="text-red-500 text-sm">{errors.confirmAccountNumber}</p>
                )}
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">IFSC code</label>
                    <input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        className="w-full border  rounded-md px-2 h-[80px] text-gray-700"
                    />
                    {errors.ifscCode && <p className="text-red-500 text-sm">{errors.ifscCode}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Branch name</label>
                    <input
                        type="text"
                        name="branchName"
                        placeholder="auto fill"
                        value={formData.branchName}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 h-[80px] text-gray-700"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Account Holder Name</label>
                    <input
                        type="text"
                        name="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 h-[80px] text-gray-700"
                    />
                    {errors.accountHolderName && (
                        <p className="text-red-500 text-sm">{errors.accountHolderName}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Attach all Valid Documents
                </label>
                <div className="w-full border rounded-md h-[80px] flex items-center px-2">
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="text-gray-700"
                    />
                </div>
                <p className="text-red-500 text-xs mt-1">
                    * Aadhaar, Bank Passbook or Cheque
                </p>
                {errors.documents && <p className="text-red-500 text-sm">{errors.documents}</p>}
            </div>

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-1 border rounded-md text-sm"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={!allFilled}
                    className={`px-5 py-1 text-white rounded-md text-sm ${allFilled
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-blue-400 cursor-not-allowed"
                        }`}
                >
                    Add Employee
                </button>
            </div>
        </form>
    );
};

export default BankDetails;
