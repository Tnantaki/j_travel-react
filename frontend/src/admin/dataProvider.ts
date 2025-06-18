import jsonServerProvider from "ra-data-json-server";
import { DataProvider, fetchUtils } from "react-admin";
import userService from "../services/user-service";
import axios from "axios";

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = userService.getToken();
  console.log(token);
  if (token) {
    (options.headers as Headers).set("x-auth-token", token);
  }
  return fetchUtils.fetchJson(url, options);
};

const apiUrl = "http://localhost:3000/api";

// 🔐 Get token from localStorage (or from a token service)
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { "x-auth-token": token } : {};
};

const baseProvider = jsonServerProvider(apiUrl, httpClient);

// Helper: Replace _id with id
const mapId = (data: any) => {
  if (Array.isArray(data)) {
    return data.map((item) => ({ ...item, id: item._id }));
  } else {
    return { ...data, id: data._id };
  }
};

// Wrap and fix both _id -> id and fallback for X-Total-Count
export const dataProvider: DataProvider = {
  ...baseProvider,

  getList: async (resource, params) => {
    try {
      console.log("resource", resource);
      console.log("params", params);
      const res = await axios.get(`${apiUrl}/${resource}`, {
        headers: {
          ...getAuthHeader(),
        },
      });

      return {
        data: mapId(res.data),
        total: 10,
      };
    } catch (error: any) {
      console.log(error);
      return {
        data: mapId(error.body),
        total: 10,
      };
    }
  },

  getOne: async (resource, params) => {
    const response = await baseProvider.getOne(resource, params);
    return { data: mapId(response.data) };
  },

  getMany: async (resource, params) => {
    const response = await baseProvider.getMany(resource, params);
    return { data: mapId(response.data) };
  },

  getManyReference: async (resource, params) => {
    const response = await baseProvider.getManyReference(resource, params);
    return {
      data: mapId(response.data),
      total: response.total,
    };
  },

  create: async (resource, params) => {
    if (resource === "plans") {
      const formData = new FormData();

      // Append regular text fields (if any)
      for (const key in params.data) {
        if (key !== "file") {
          formData.append(key, params.data[key]);
        }
      }

      // Append image file(s)
      if (params.data.file) {
        const files = Array.isArray(params.data.file)
          ? params.data.file
          : [params.data.file];

        files.forEach((file) => {
          formData.append("images", file.rawFile); // .rawFile is important in react-admin
        });
      }

      const token = userService.getToken();
      const myHeaders = new Headers();
      if (token) {
        myHeaders.append("x-auth-token", token);
      }

      console.log("formData",formData)

      const response = await fetch(`${apiUrl}/plans/create-with-image`, {
        method: "POST",
        headers: myHeaders,
        body: formData,
      });

      if (!response.ok) {
        console.log(response)
        throw new Error("Image upload failed");
      }

      const json = await response.json();
      return { data: { ...json, id: json.id } };
    }

    const response = await baseProvider.create(resource, params);
    return { data: mapId(response.data) };
  },

  update: async (resource, params) => {
    const response = await baseProvider.update(resource, params);
    return { data: mapId(response.data) };
  },

  updateMany: async (resource, params) => {
    const response = await baseProvider.updateMany(resource, params);
    return { data: mapId(response.data) };
  },

  delete: async (resource, params) => {
    const response = await baseProvider.delete(resource, params);
    return { data: mapId(response.data) };
  },

  deleteMany: async (resource, params) => {
    const response = await baseProvider.deleteMany(resource, params);
    return { data: mapId(response.data) };
  },
};

// export const dataProvider = jsonServerProvider(
//   "http://localhost:3000/api",
//   httpClient
// );
