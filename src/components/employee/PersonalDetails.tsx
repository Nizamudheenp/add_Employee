import React, { useState } from "react";
import axios from "axios";

interface PersonalDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

type PersonalData = {
  address: string;
  phone: string;
  emergencyPhone: string;
  gender: string;
  dob: string;
  nationality: string;
  bloodGroup: string;
};

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ onNext, onBack }) => {

  const api = axios.create({
    baseURL: "http://localhost:5000",
  });

  const [formData, setFormData] = useState<PersonalData>({
    address: "",
    phone: "",
    emergencyPhone: "",
    gender: "",
    dob: "",
    nationality: "",
    bloodGroup: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PersonalData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof PersonalData, string>> = {};
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.emergencyPhone) newErrors.emergencyPhone = "Emergency number is required";
    if (!formData.gender) newErrors.gender = "Select gender";
    if (!formData.dob) newErrors.dob = "Select date of birth";
    if (!formData.nationality) newErrors.nationality = "Enter nationality";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Enter blood group";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const allFilled = Object.values(formData).every((val) => val.trim() !== "");

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await api.post("/api/employees/personal-details", formData);
      onNext();
    } catch (error) {
      console.error("Error submitting personal details:", error);
      alert("Failed to submit personal details. Please try again.");
    } finally {
    }
  };

  return (
    <form className="space-y-3" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
    >
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Full Address
        </label>
        <textarea
          rows={4}
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+91"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-4  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Emergency Phone Number
          </label>
          <input
            type="tel"
            name="emergencyPhone"
            placeholder="+91"
            value={formData.emergencyPhone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.emergencyPhone && <p className="text-red-500 text-sm">{errors.emergencyPhone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Nationality
          </label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Blood Group
          </label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-1 border bg-gray-100 rounded-md text-sm"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!allFilled}
          className={`px-5 py-1 text-white rounded-md text-sm ${allFilled ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default PersonalDetails;
