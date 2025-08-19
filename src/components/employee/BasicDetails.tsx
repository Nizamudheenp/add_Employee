import React, { useState, type ChangeEvent, type FormEvent } from "react";
import useAddEmployeeViewModel from "../../viewmodels/useAddEmployeeViewModel";
import type { BasicDetailsPayload } from "../../services/employeeService";


interface Props {
  onNext: () => void;
}

const BasicDetails: React.FC<Props> = ({ onNext }) => {

  const { submitBasicDetails } = useAddEmployeeViewModel();

  const [formData, setFormData] = useState<BasicDetailsPayload>({
    firstName: "",
    lastName: "",
    employeeId: "",
    jobType: "",
    designation: "",
    department: "",
    userType: "",
    repMgrTl: "",
    salary: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const [previewImage, setPreviewImage] = useState<string>("/default-avatar.jpeg");
  const [errors, setErrors] = useState<Partial<Record<keyof BasicDetailsPayload, string>>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePic: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof BasicDetailsPayload, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Second name is required";
    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!formData.jobType) newErrors.jobType = "Select job type";
    if (!formData.designation) newErrors.designation = "Select designation";
    if (!formData.department) newErrors.department = "Select department";
    if (!formData.userType) newErrors.userType = "Select user type";
    if (!formData.repMgrTl) newErrors.repMgrTl = "Select Rep Mgr / TL";
    if (!formData.salary || isNaN(Number(formData.salary))) newErrors.salary = "Enter valid salary";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter valid email";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const allFieldsFilled = () =>
    Object.values(formData).every((val) => val !== "" && val !== null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) submitData.append(key, value as string | Blob);
    });

    try {
      await submitBasicDetails(formData);
      onNext();
    } catch (error) {
      console.error(error);
      alert("Error adding basic details");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Profile Pic */}
      <div className="bg-purple-50 p-3 rounded-md flex items-center space-x-4">
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <div>
          <h4 className="font-medium text-gray-700">Upload Profile Picture</h4>
          <p className="text-sm text-gray-500 mb-2">Image should be below 4 mb</p>
          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="profilePic"
            />
            <label
              htmlFor="profilePic"
              className="px-5 py-1 bg-blue-500 text-white rounded-md cursor-pointer text-sm"
            >
              Upload
            </label>
            {formData.profilePic && (
              <button
                type="button"
                onClick={() => {
                  setPreviewImage("/default-avatar.jpeg");
                  setFormData({ ...formData, profilePic: null });
                }}
                className="px-5 py-1 border bg-gray-100 rounded-md text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border px-2 h-[80px] rounded-md"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border px-2 h-[80px] rounded-md"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Employee ID
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="border h-[60px] px-2 rounded-md w-full"
          />
          {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Job Type
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="border text-gray-600 h-[60px] px-2 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
          </select>
          {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Designation
          </label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="border text-gray-600 h-[60px] px-2 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
          </select>
          {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border text-gray-600 h-[60px] px-2 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="it">IT</option>
            <option value="hr">HR</option>
          </select>
          {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            User Type
          </label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="border text-gray-600 h-[60px] px-2 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
          {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Rep Mgr / TL
          </label>
          <select
            name="repMgrTl"
            value={formData.repMgrTl}
            onChange={handleChange}
            className="border text-gray-600 h-[60px] px-2 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="mgr1">Manager 1</option>
            <option value="mgr2">Manager 2</option>
            <option value="tl1">Team Lead 1</option>
            <option value="tl2">Team Lead 2</option>
          </select>
          {errors.repMgrTl && <p className="text-red-500 text-sm">{errors.repMgrTl}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Salary
          </label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="border text-gray-600 h-[60px] px-2 rounded-md w-full"
          />
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Employee Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-2 h-[80px] rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Create Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border px-2 h-[80px] rounded-md w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border h-[80px] px-2 rounded-md w-full"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="px-4 py-1 border rounded-md"
          onClick={() => {
            setFormData({
              firstName: "",
              lastName: "",
              employeeId: "",
              jobType: "",
              designation: "",
              department: "",
              userType: "",
              repMgrTl: "",
              salary: "",
              email: "",
              password: "",
              confirmPassword: "",
              profilePic: null,
            });
            setPreviewImage("/default-avatar.jpeg");
            setErrors({});
          }}

        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!allFieldsFilled()}
          className={`px-5 py-1 rounded-md text-white ${allFieldsFilled() ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default BasicDetails;
