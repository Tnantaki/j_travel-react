// import axios from "axios"
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

  logout() {
    localStorage.removeItem(tokenKey);
  }
}

export default new UserService();

// export {
//   registerUser
// }
