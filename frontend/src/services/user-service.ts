// import axios from "axios"
import { jwtDecode, JwtPayload } from "jwt-decode";
import apiClients from "./api-clients";
import { AxiosError } from "axios";

const tokenKey = "token";

export interface UserInput {
  email: string;
  password: string;
}

export interface MyJwtPayload extends JwtPayload {
  isAdmin?: boolean
}

// const registerUser = (user: UserInput) => {
//   return axios.post('http://localhost:3000/api/users', user)
// }

class UserService {
  getAll() {
    return apiClients.get("/users");
  }

  register(user: UserInput) {
    return apiClients.post("/users", user);
  }

  async login(user: UserInput) {
    let res;
    try {
      res = await apiClients.post("/auth", user);
    } catch (error) {
      throw error;
    }
    if (res.status < 200 || res.status >= 300) {
      if (res.statusText) {
        throw new Error(res.statusText);
      } else if (res.status >= 400 && res.status < 500) {
        throw new Error("Invalid username or password.");
      } else {
        throw new Error("Something wentwrong.");
      }
    }
    localStorage.setItem(tokenKey, res.data);
    console.log(res.data)
  }

  getCurrentUser() {
    const jwt = localStorage.getItem(tokenKey);
    if (jwt) {
      return jwtDecode<MyJwtPayload>(jwt);
    } else {
      return null;
    }
  }

  getToken() {
    return localStorage.getItem(tokenKey);
  }

  logout() {
    localStorage.removeItem(tokenKey);
  }
}

export default new UserService();

// export {
//   registerUser
// }
