import apiClients from "./api-clients";

export type Gender = "Male" | "Female";

export interface ProfileType {
  firstName: string;
  lastName: string;
  region: string;
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

// const getProfile = () => {
//   return axios.get<Profile>("https://jsonplaceholder.typicode.com/users/1");
// };

// export { getProfile };

export default new profileService();
