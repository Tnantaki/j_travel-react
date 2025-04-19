import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";
import userService from "../services/user-service";

const httpClient = (
  url: string,
  options: fetchUtils.Options = {}
) => {
  if (!options.headers) {
    options.headers = new Headers();
  }
  const token = userService.getToken()
  console.log(token)
  if (token) {
    (options.headers as Headers).set("x-auth-token", token);
  }
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = jsonServerProvider(
  "http://localhost:3000/api",
  httpClient
);
