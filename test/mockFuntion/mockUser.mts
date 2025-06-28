import axios from "axios";
import { handleError } from "../utils/error.mts";
import { BACKEND_URL } from "../utils/constant";
import type {
  ApiResponse,
  ProfileData,
  UserData,
} from "../utils/type";
import FormData from "form-data";
import { readFileSync } from "fs";
import path from "path";

const API_USER = BACKEND_URL + "users";
const API_LOGIN = BACKEND_URL + "auth";
const API_PROFILE = BACKEND_URL + "profiles";
const API_PROFILE_IMAGE = BACKEND_URL + "profiles/upload-profile-image";

async function createUser(userData: UserData): Promise<ApiResponse> {
  try {
    const response = await axios.post(API_USER, userData);

    return {
      success: true,
      status: response.status,
      data: response.data,
      contentType: response.headers["content-type"],
      error: "",
    };
  } catch (error) {
    const data = handleError(error);
    return {
      ...data,
      success: false,
    };
  }
}

async function loginUser(userData: UserData) {
  try {
    const response = await axios.post(API_LOGIN, userData);

    return {
      success: true,
      status: response.status,
      data: response.data,
      contentType: response.headers["content-type"],
      error: "",
    };
  } catch (error) {
    const data = handleError(error);
    return {
      ...data,
      success: false,
    };
  }
}

async function createProfile(profile: ProfileData) {
  const headers = {
    "x-auth-token": profile.token,
  };
  try {
    const response = await axios.post(
      API_PROFILE,
      {
        username: profile.name,
        address: {
          street: "Sukhumvit Road",
          building: "Siam Paragon",
          houseNo: "123",
          district: "Watthana",
          postalCode: "10110",
          subDistrict: "Khlong Tan Nuea",
          province: "Bangkok",
          country: "Thailand",
        },
        phone: "0812345678",
        email: profile.email,
        birthday: "1990-05-15",
        gender: "male",
        idNumber: "1111111111111",
        passportNumber: "1234",
      },
      { headers }
    );

    return {
      success: true,
      status: response.status,
      data: response.data,
      contentType: response.headers["content-type"],
      error: "",
    };
  } catch (error) {
    const data = handleError(error);
    return {
      ...data,
      success: false,
    };
  }
}

async function uploadProfileImage(imgPath: string, token: string) {
  const headers = {
    "x-auth-token": token,
  };
  try {
    const formData = new FormData();
    const fileData = readFileSync(imgPath);
    const fileName = path.basename(imgPath);
    formData.append("profileImage", fileData, {
      filename: fileName,
    });

    const response = await axios.post(API_PROFILE_IMAGE, formData, {
      headers,
    });

    return {
      success: true,
      status: response.status,
      data: response.data,
      contentType: response.headers["content-type"],
      error: "",
    };
  } catch (error) {
    const data = handleError(error);
    return {
      ...data,
      success: false,
    };
  }
}

export { createUser, loginUser, createProfile, uploadProfileImage };
