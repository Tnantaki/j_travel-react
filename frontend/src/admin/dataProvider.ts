import jsonServerProvider from "ra-data-json-server";
import { DataProvider, fetchUtils } from "react-admin";
import userService from "../services/user-service";
import axios from "axios";

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = userService.getToken();
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

const formDataPost = async (url: string, body: any) => {
  const token = userService.getToken();
  const myHeaders = new Headers();
  if (token) {
    myHeaders.append("x-auth-token", token);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: myHeaders,
    body,
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Image upload failed");
  }

  const json = await response.json();

  return json;
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
    tag: string[];
  }[];
}

// Wrap and fix both _id -> id and fallback for X-Total-Count
export const dataProvider: DataProvider = {
  ...baseProvider,

  getList: async (resource, params) => {
    try {
      console.log("params", params);
      if (resource === "images" && params.pagination) {
        const { page, perPage } = params.pagination;
        const { tags } = params.filter;

        console.log("Fetching images with tags:", tags);

        let url = `${apiUrl}/${resource}/`;
        if (tags) {
          url += `?page=${page}&limit=${perPage}&tags=${tags}`;
        } else {
          url += `all?page=${page}&limit=${perPage}`;
        }

        const { data } = await axios.get<ImagesType>(url, {
          headers: {
            ...getAuthHeader(),
          },
        });
        return {
          data: data.items.map((item) => ({ ...item, id: item._id })),
          total: data.totalItems,
        };
      }
      let res;
      if (resource === "inactiveImages") {
        console.log("inactive iamges");
        res = await axios.get(`${apiUrl}/images/inactive-images`, {
          headers: {
            ...getAuthHeader(),
          },
        });
        console.log(mapId(res.data.imgs));
        return { data: mapId(res.data.imgs), total: 25 };
      } else {
        res = await axios.get(`${apiUrl}/${resource}`, {
          headers: {
            ...getAuthHeader(),
          },
        });
      }

      return {
        data: mapId(res.data),
        total: 25,
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
    console.log('response data', response.data)
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
    if (
      (resource === "plans" &&
        Array.isArray(params.data.images) &&
        params.data.images.length) ||
      resource === "images"
    ) {
      console.log("There are images");
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

        let idxImage = 0;
        images.forEach((image) => {
          formData.append("images", image.file.rawFile); // .rawFile is important in react-admin
          if (image.tag) {
            formData.append(`tag[${idxImage}]`, image.tag);
          }
          if (image.caption) {
            formData.append(`caption[${idxImage}]`, image.caption);
          }
          idxImage++;
        });
      }

      let json;
      if (resource === "images") {
        json = await formDataPost(`${apiUrl}/images`, formData);
      } else {
        json = await formDataPost(
          `${apiUrl}/plans/create-with-image`,
          formData
        );
      }
      return { data: { ...json, id: json.id } };
    }
    if (resource === "plans") {
      delete params.data.images;
    }

    const response = await baseProvider.create(resource, params);
    return { data: mapId(response.data) };
  },

  update: async (resource, params) => {
    console.log('update')
    console.log(params.data)
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
    console.log("delete many");
    if (resource === "images" || resource === "inactiveImages") {
      let url;
      if (resource === "images") {
        url = `${apiUrl}/images/soft-delete`;
      } else {
        url = `${apiUrl}/images/hard-delete`;
      }
      await axios.delete(url, {
        headers: {
          ...getAuthHeader(),
        },
        data: {
          ids: params.ids,
        },
      });
      return { data: [params.ids] };
    }

    const response = await baseProvider.deleteMany(resource, params);
    return { data: mapId(response.data) };
  },
};

// export const dataProvider = jsonServerProvider(
//   "http://localhost:3000/api",
//   httpClient
// );
