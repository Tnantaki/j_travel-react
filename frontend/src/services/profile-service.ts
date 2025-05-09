import apiClients from "./api-clients";

export type Gender = "Male" | "Female";

interface Address {
  street: string;
  building: string;
  houseNo: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface ProfileInput {
  username: string;
  address: Address;
  phone: string;
  email: string;
  birthday: string;
  age: number;
  gender: string;
}

export interface ProfileType {
  firstName: string;
  lastName: string;
  birthday: Date;
  age: number;
  phone: string;
  email: string;
  gender: Gender;
  idNo: number;
  passportNo: number;
  address: Address;
}

class profileService {
  createProfile(profile: ProfileType) {
    return apiClients.post("/profiles", profile);
  }

  getProfile() {
    return apiClients.get<ProfileType>("/profiles/me");
  }

  deleteProfile() {
    return apiClients.delete("/profiles/me");
  }
}

export default new profileService();
