import apiClients from "./api-clients";

export type Gender = "Male" | "Female";

export interface ProfileType {
  firstName: string;
  lastName: string;
  birthday: string;
  age: number;
  phone: string;
  email: string;
  idNo: number;
  passportNo: number;
  street: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: number;
  country: string;
  gender: Gender;
}

class profileService {
  createProfile(profile: ProfileType) {
    return apiClients.post("/profile", profile);
  }

  getProfile() {
    return apiClients.get<ProfileType>("/profile");
  }

  deleteProfile() {
    return apiClients.delete("/profile");
  }
}

export default new profileService();
