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

const postWithAuth = async (url: string, body: any) => {
  const { data } = await axios.post(url, {
    headers: {
      ...getAuthHeader(),
    },
    body,
  });

  return data;
};

interface ImagesType {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  items: {
    _id: string;
    imageUrl: string;
    fileName: string;
  }[];
}

// Wrap and fix both _id -> id and fallback for X-Total-Count
export const dataProvider: DataProvider = {
  ...baseProvider,

  getList: async (resource, params) => {
    try {
      console.log("resource", resource);
      console.log("params", params);
      if (resource === "images" && params.pagination) {
        const { page, perPage } = params.pagination;
        const { data } = await axios.get<ImagesType>(
          `${apiUrl}/${resource}/all?page=${page}&limit=${perPage}`,
          {
            headers: {
              ...getAuthHeader(),
            },
          }
        );
        console.log(data);
        return {
          data: data.items.map((item) => ({ ...item, id: item._id })),
          total: data.totalItems,
        };
      }
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
    console.log(response.data);
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
    if (resource === "plans" || resource === "images") {
      const formData = new FormData();

      // Append regular text fields (if any)
      for (const key in params.data) {
        if (key !== "images") {
          formData.append(key, params.data[key]);
        }
      }

      // Append image file(s)
      if (params.data.images) {
        const images = Array.isArray(params.data.images)
          ? params.data.images
          : [params.data.images];

        images.forEach((image) => {
          formData.append("images", image.file.rawFile); // .rawFile is important in react-admin
          if (image.tag) {
            formData.append("tag", image.tag);
          }
          if (image.caption) {
            formData.append("caption", image.caption);
          }
        });
      }

      let json;
      if (resource === "images") {
        for (const value of formData.values()) {
          console.log(value)
        }
        json = await postWithAuth(`${apiUrl}/images`, formData);
      } else {
        json = await postWithAuth(
          `${apiUrl}/plans/create-with-image`,
          formData
        );
      }
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
