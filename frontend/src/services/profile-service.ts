import apiClients from "./api-clients";

export type Gender = "male" | "female";

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

export interface ProfileAPI {
  _id: string;
  username: string;
  phone: string;
  email: string;
  birthday: string;
  gender: Gender;
  idNumber: string;
  passportNumber: string;
  address: Address;
}

export interface ProfileType {
  firstName: string;
  lastName: string;
  birthday: string;
  age: string;
  phone: string;
  email: string;
  gender: Gender;
  idNo: string;
  passportNo: string;
  address: Address;
}

class profileService {
  createProfile(profile: ProfileAPI) {
    return apiClients.post("/profiles", profile);
  }

  getProfile() {
    return apiClients.get<ProfileAPI>("/profiles/me");
  }

  deleteProfile() {
    return apiClients.delete("/profiles/me");
  }
}

export default new profileService();
