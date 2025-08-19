import api from "./api";

export interface BasicDetailsPayload {
  firstName: string;
  lastName: string;
  employeeId: string;
  jobType: string;
  designation: string;
  department: string;
  userType: string;
  repMgrTl: string;
  salary: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic?: File | null;
}

export interface PersonalDetailsPayload {
  address: string;
  phone: string;
  emergencyPhone: string;
  gender: string;
  dob: string;
  nationality: string;
  bloodGroup: string;
}

export const employeeService = {
  addBasicDetails: async (data: BasicDetailsPayload) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value as string | Blob);
    });

    const res = await api.post("/employees/basic-details", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  addPersonalDetails: async (data: PersonalDetailsPayload) => {
    const res = await api.post("/employees/personal-details", data);
    return res.data;
  },
};
