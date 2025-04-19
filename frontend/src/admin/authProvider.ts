import { AuthProvider } from "react-admin";
import userService from "../services/user-service";

export const authProvider: AuthProvider = {
  async login({ username: email, password }) {
    await userService.login({ email, password });
  },
  async checkError(error) {
    console.log('check error')
    const status = error.status;
    if (status === 401 || status === 403) {
      userService.logout();
      throw new Error("Session expired");
    }
    // other error codes (404, 500, etc): no need to log out
  },
  async checkAuth() {
    const user = userService.getCurrentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }
    if (!user.isAdmin) {
      throw new Error("You not an admin");
    }
  },
  async logout() {
    userService.logout();
  },
};
