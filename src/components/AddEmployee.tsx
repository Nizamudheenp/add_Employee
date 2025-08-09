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

  const [previewImage, setPreviewImage] = useState<string>("/default-avatar.jpeg");
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
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-5">
      <h2 className="text-lg font-semibold mb-4 text-gray-600">Add New Employee</h2>

      <div className="flex border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium ${activeTab === tab
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
          <div className="bg-purple-50 p-4 rounded-md flex  items-center space-x-4">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div>
              <h4 className="font-medium text-gray-700">Upload Profile Picture</h4>
              <p className="text-sm text-gray-500 mb-2">
                Image should be below 4 mb
              </p>
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
                  className="px-5  py-1 bg-blue-500 text-white rounded-md cursor-pointer text-sm"
                >
                  Upload
                </label>
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
              </div>
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Second Name
            </label>
            <input
              type="text"
              name="secondName"
              value={formData.secondName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
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
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              >
                <option value="">Select</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              >
                <option value="">Select</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              >
                <option value="">Select</option>
                <option value="it">IT</option>
                <option value="hr">HR</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                User Type
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              >
                <option value="">Select</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
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
              className="w-full border p-2 rounded-md"
            />
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
                className="border p-2 rounded-md w-full"
              />
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
                className="border p-2 rounded-md w-full"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-5 py-1 bg-gray-200 rounded-md"
              onClick={() => setFormData({ ...formData })}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1 bg-blue-500 text-white rounded-md"
            >
              Continue
            </button>
          </div>
        </form>
      )}

    </div>
  );
};

export default AddEmployee;
