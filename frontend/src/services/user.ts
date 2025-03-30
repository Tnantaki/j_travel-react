// import axios from "axios"
import { jwtDecode } from "jwt-decode";
import apiClients from "./api-clients";

const tokenKey = "token";

export interface UserInput {
  email: string;
  password: string;
}

// const registerUser = (user: UserInput) => {
//   return axios.post('http://localhost:3000/api/users', user)
// }

class UserService {
  register(user: UserInput) {
    return apiClients.post("/users", user);
  }

  async login(user: UserInput) {
    return apiClients.post("/auth", user);
  }

  setJWT(jwt: string) {
    localStorage.setItem(tokenKey, jwt);
  }

  getCurrentUser() {
    try {
      const jwt = localStorage.getItem(tokenKey);
      if (jwt) {
        return jwtDecode(jwt);
      } else {
        return null;
      }
    } catch (ex) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem(tokenKey);
  }
}

export default new UserService();

// export {
//   registerUser
// }
