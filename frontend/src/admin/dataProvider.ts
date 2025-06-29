import jsonServerProvider from "ra-data-json-server";
import { DataProvider, fetchUtils } from "react-admin";
import userService from "../services/user-service";
import axios from "axios";
import { PlanType } from "./transform";

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
  return {
    headers: token ? { "x-auth-token": token } : {},
  };
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

export async function fetchFormData(
  url: string,
  formData: any,
  method: "post" | "patch"
) {
  const headers = {
    "x-auth-token": userService.getToken(),
  };
  if (method === "post") {
    const { data } = await axios.post(url, formData, { headers });
    return data;
  } else {
    const { data } = await axios.patch(url, formData, { headers });
    return data;
  }
}

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

      const headers = getAuthHeader();
      const { data } = await axios.get<ImagesType>(url, headers);
      return {
        data: data.items.map((item) => ({ ...item, id: item._id })),
        total: data.totalItems,
      };
    }
    let res;
    if (resource === "inactiveImages") {
      res = await axios.get(
        `${apiUrl}/images/inactive-images`,
        getAuthHeader()
      );
      return { data: mapId(res.data.imgs), total: res.data.total };
    } else {
      res = await axios.get(`${apiUrl}/${resource}`, getAuthHeader());
    }

    return {
      data: mapId(res.data),
      total: 25,
    };
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
    if (resource === "images") {
      const json = await fetchFormData(
        `${apiUrl}/images`,
        params.data.formData,
        "post"
      );
      return { data: { ...json, id: json.id } };
    }
    if (resource === "plans") {
      const planData: PlanType = params.data.plan;
      const { data } = await axios.post(
        `${apiUrl}/${resource}`,
        planData,
        getAuthHeader()
      );
      if (!params.data.formData) {
        return { data: { ...data, id: data._id } };
      }

      // Upload images
      const endpoint = `${apiUrl}/plans/image-to-plan/${data._id}`;
      const json = await fetchFormData(endpoint, params.data.formData, "patch");
      return { data: { ...json, id: json.id } };
    }

    const response = await baseProvider.create(resource, params);
    return { data: mapId(response.data) };
  },

  update: async (resource, params) => {
    if (resource === "plans") {
      const planData: PlanType = params.data.plan;
      const url = `${apiUrl}/${resource}/${params.id}`;
      const { data } = await axios.put(url, planData, getAuthHeader());
      if (!params.data.formData) {
        return { data: { ...data, id: data._id } };
      }

      // Upload images
      const endpoint = `${apiUrl}/plans/image-to-plan/${data._id}`;
      const json = await fetchFormData(endpoint, params.data.formData, "patch");
      return { data: { ...json, id: json.id } };
    }
    const response = await baseProvider.update(resource, params);
    return { data: mapId(response.data) };
  },

  updateMany: async (resource, params) => {
    if (resource === "inactiveImages") {
      const url = `${apiUrl}/images/active-images`;
      const data = { ids: params.ids };
      await axios.patch(url, data, getAuthHeader());
      return { data: [params.ids] };
    }

    const response = await baseProvider.updateMany(resource, params);
    return { data: mapId(response.data) };
  },

  delete: async (resource, params) => {
    const response = await baseProvider.delete(resource, params);
    return { data: mapId(response.data) };
  },

  deleteMany: async (resource, params) => {
    if (
      resource === "images" ||
      resource === "inactiveImages" ||
      resource === "plans"
    ) {
      console.log("delete many ", params);
      let url;
      if (resource === "images") {
        url = `${apiUrl}/images/soft-delete`;
      } else if (resource === "inactiveImages") {
        url = `${apiUrl}/images/hard-delete`;
      } else {
        url = `${apiUrl}/plans/delete-plans`;
      }
      await axios.delete(url, {
        ...getAuthHeader(),
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
