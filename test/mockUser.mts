import axios from "axios";
import { handleError } from "./error.mts";

const BACKEND_URL = "http://localhost:3000/api/";

const API_USER = BACKEND_URL + "users";
const API_LOGIN = BACKEND_URL + "auth";
const API_PROFILE = BACKEND_URL + "profiles";

// Type definitions
interface UserData {
  email: string;
  password: string;
}

interface ProfileData {
  token: string;
  name: string;
  email: string;
}

async function createUser(userData: UserData) {
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

export { createUser, loginUser, createProfile };
