import React, { useState, type ChangeEvent, type FormEvent } from "react";
import api from "../api/api";

type EmployeeData = {
  firstName: string;
  secondName: string;
  employeeId: string;
  jobType: string;
  designation: string;
  department: string;
  userType: string;
  salary: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic?: File | null;
};

const AddEmployee: React.FC = () => {
  const [formData, setFormData] = useState<EmployeeData>({
    firstName: "",
    secondName: "",
    employeeId: "",
    jobType: "",
    designation: "",
    department: "",
    userType: "",
    salary: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Basic Details");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePic: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) submitData.append(key, value as string | Blob);
    });

    try {
      const res = await api.post("/api/employees", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Employee added:", res.data);
      alert("Employee added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding employee");
    }
  };

  const tabs = ["Basic Details", "Personal Details", "Bank Details"];

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>

      <div className="flex border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Basic Details" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-md flex items-center space-x-4">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="profilePic"
            />
            <label
              htmlFor="profilePic"
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            >
              Upload
            </label>
            <button
              type="button"
              onClick={() => {
                setPreviewImage(null);
                setFormData({ ...formData, profilePic: null });
              }}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
          </div>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="secondName"
            placeholder="Second Name"
            value={formData.secondName}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="border p-2 rounded-md"
            >
              <option value="">Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
            </select>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="border p-2 rounded-md"
            >
              <option value="">Designation</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
            </select>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border p-2 rounded-md"
            >
              <option value="">Department</option>
              <option value="it">IT</option>
              <option value="hr">HR</option>
            </select>
          </div>

          {/* User Type & Salary */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="border p-2 rounded-md"
            >
              <option value="">User Type</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            <input
              type="text"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Employee Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-md"
              onClick={() => setFormData({ ...formData })}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Continue
            </button>
          </div>
        </form>
      )}

      {activeTab === "Personal Details" && (
        <div className="text-gray-500">Personal Details form coming soon...</div>
      )}
      {activeTab === "Bank Details" && (
        <div className="text-gray-500">Bank Details form coming soon...</div>
      )}
    </div>
  );
};

export default AddEmployee;
