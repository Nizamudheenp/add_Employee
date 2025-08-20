import React, { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import type { BasicDetailsPayload } from "../../services/employeeService";


interface BasicDetailsProps {
  data: BasicDetailsPayload;
  update: (patch: Partial<BasicDetailsPayload>) => void;
  onNext: () => void;
}

type Errors = Partial<Record<keyof BasicDetailsPayload, string>>;

const BasicDetails: React.FC<BasicDetailsProps> = ({ data, update, onNext }) => {

  const [errors, setErrors] = useState<Errors>({});
  const defaultAvatar = "/default-avatar.jpeg";
  const [previewImage, setPreviewImage] = useState<string>(defaultAvatar);

    useEffect(() => {
    if (data.profilePic instanceof File) {
      const url = URL.createObjectURL(data.profilePic);
      setPreviewImage(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewImage(defaultAvatar);
    }
  }, [data.profilePic]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
     const { name, value } = e.target;
    update({ [name]: value } as Partial<BasicDetailsPayload>);
    setErrors((prev) => ({ ...prev, [name as keyof BasicDetailsPayload]: "" }));
  };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    update({ profilePic: file });
  };

  const validate = (payload: BasicDetailsPayload) => {
    const newErrors: Errors = {};
    if (!payload.firstName.trim()) newErrors.firstName = "First name is required";
    if (!payload.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!payload.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!payload.jobType) newErrors.jobType = "Select job type";
    if (!payload.designation) newErrors.designation = "Select designation";
    if (!payload.department) newErrors.department = "Select department";
    if (!payload.userType) newErrors.userType = "Select user type";
    if (!payload.repMgrTl) newErrors.repMgrTl = "Select Rep Mgr / TL";

    if (!payload.salary || isNaN(Number(payload.salary))) {
      newErrors.salary = "Enter valid salary";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!payload.email || !emailRegex.test(payload.email))
      newErrors.email = "Enter valid email";

    if (!payload.password || payload.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (payload.confirmPassword !== payload.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const allFieldsFilled = useMemo(() => {
    const { profilePic, ...rest } = data;
    // profilePic optional 
    return Object.values(rest).every((v) => v !== "" && v !== null && v !== undefined);
  }, [data]);

   const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate(data)) return;
    onNext();
  };

  const clearAll = () => {
    update({
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
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

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
            {data.profilePic && (
               <button
                type="button"
                onClick={() => update({ profilePic: null })}
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
          value={data.firstName}
          onChange={handleChange}
          className="w-full border px-2 h-[80px] rounded-md text-gray-700 "
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
          value={data.lastName}
          onChange={handleChange}
          className="w-full border px-2 h-[80px] rounded-md text-gray-700"
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
            value={data.employeeId}
            onChange={handleChange}
            className="border h-[60px] px-2 rounded-md w-full text-gray-700"
          />
          {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Job Type
          </label>
          <select
            name="jobType"
            value={data.jobType}
            onChange={handleChange}
            className="border text-gray-600 h-[60px] px-2 rounded-md w-full text-gray-700"
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
            value={data.designation}
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
            value={data.department}
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
            value={data.userType}
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
            value={data.repMgrTl}
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
            value={data.salary}
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
          value={data.email}
          onChange={handleChange}
          className="w-full border px-2 h-[80px] rounded-md text-gray-700"
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
            value={data.password}
            onChange={handleChange}
            className="border px-2 h-[80px] rounded-md w-full text-gray-700"
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
            value={data.confirmPassword}
            onChange={handleChange}
            className="border h-[80px] px-2 rounded-md w-full text-gray-700"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="px-4 py-1 border rounded-md"
          onClick={clearAll}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!allFieldsFilled}
          className={`px-5 py-1 rounded-md text-white ${allFieldsFilled ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default BasicDetails;
