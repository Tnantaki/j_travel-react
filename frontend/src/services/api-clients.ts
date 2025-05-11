import axios, { CanceledError } from "axios";
import { tokenKey } from "./user-service";

const apiClients =  axios.create({
  baseURL: "http://localhost:3000/api"
})

// Attach token dynamically to every request
apiClients.interceptors.request.use(config => {
  const token = localStorage.getItem(tokenKey); // or get it from a getter function
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default apiClients

export { CanceledError }