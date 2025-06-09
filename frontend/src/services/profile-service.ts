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
  user: string;
  username: string;
  phone: string;
  email: string;
  birthday: string;
  gender: Gender;
  idNumber: string;
  passportNumber: string;
  address: Address;
  profileImage: string
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
  createProfile(userId: string, profile: ProfileType) {
    return apiClients.post("/profiles", {
      user: userId,
      ...this.convertProfileType(profile),
    });
  }

  uploadImage(file: File) {
    const formData = new FormData()

    formData.append('profileImage', file)
    return apiClients.post("/profiles/upload-profile-image", formData);
  }

  updateProfile(profile: ProfileType) {
    return apiClients.put("/profiles/me", this.convertProfileType(profile));
  }

  getProfile() {
    const controller = new AbortController();

    const request = apiClients.get<ProfileAPI>("/profiles/me", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  deleteProfile() {
    return apiClients.delete("/profiles/me");
  }

  convertProfileType(profile: ProfileType) {
    const fullName = `${profile.firstName} ${profile.lastName}`;

    return {
      username: fullName,
      phone: profile.phone,
      email: profile.email,
      birthday: profile.birthday,
      gender: profile.gender,
      idNumber: profile.idNo,
      passportNumber: profile.passportNo,
      address: profile.address,
    };
  }
}

export default new profileService();
