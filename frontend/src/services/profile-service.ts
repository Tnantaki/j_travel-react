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

export interface PasswordChange {
  oldPassword: string
  newPassword: string
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
    return apiClients.post("/profile", profile);
  }

  changePassword(password: PasswordChange) {
    return apiClients.post("/profile", password);
  }

  getProfile() {
    return apiClients.get<ProfileType>("/profile");
  }

  deleteProfile() {
    return apiClients.delete("/profile");
  }
}

export default new profileService();
