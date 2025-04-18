import { AuthProvider, Logout } from "react-admin";
import userService from "../services/user-service";

export const authProvider: AuthProvider = {
  async login({ email, password }) {
    let res;
    try {
      res = await userService.login({ email, password });
    } catch (error) {
      throw new Error("Network Error");
    }
    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.statusText);
    }
    const jwt = res.data;
    console.log(jwt);
  },
  async checkError(error) {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      throw new Error("Session expired");
    }
    // other error codes (404, 500, etc): no need to log out
  },
  async checkAuth() {
    if (!localStorage.getItem("username")) {
      throw new Error("Not authenticated");
    }
  },
  async logout() {
    localStorage.removeItem("username");
  },
};
