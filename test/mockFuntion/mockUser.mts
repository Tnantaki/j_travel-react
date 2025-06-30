import axios from "axios";
import { handleError } from "../utils/error.mts";
import { adminData, BACKEND_URL, userDatas } from "../utils/constant";
import type { ApiResponse, ProfileData, User, UserData } from "../utils/type";
import FormData from "form-data";
import { readFileSync } from "fs";
import path from "path";

const API_USER = BACKEND_URL + "users";
const API_LOGIN = BACKEND_URL + "auth";
const API_PROFILE = BACKEND_URL + "profiles";
const API_PROFILE_IMAGE = BACKEND_URL + "profiles/upload-profile-image";

async function createUser(userData: User): Promise<ApiResponse> {
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

async function loginUser(userData: User) {
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

async function getAllProfile() {
  try {
    const headers = { "x-auth-token": adminData.token };
    const response = await axios.get(API_PROFILE, { headers });

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

interface UserResType {
  _id: string;
  email: string;
}

async function prepareUserData() {
  let result;
  result = await loginUser({
    email: adminData.email,
    password: adminData.password,
  });

  if (result.success === false) {
    console.log(`❌ Failed to prepare users data`);
  }
  adminData.token = result.data;

  for (const user of userDatas) {
    const result = await loginUser({
      email: user.email,
      password: user.password,
    });
    if (result.success === false) {
      console.log(`❌ Failed to prepare users data`);
    }
    user.token = result.data;
  }
  result = await getAllProfile();

  for (const user of result.data) {
    userDatas.map((userData) => {
      if (adminData.email === user.email) {
        adminData.id = user._id;
      }
      if (userData.email === user.email) {
        userData.id = user._id;
      }
    });
  }
  console.log(`✅ successfully prepared data`);
}

export {
  createUser,
  loginUser,
  createProfile,
  uploadProfileImage,
  prepareUserData,
};
