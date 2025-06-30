import axios from "axios";
import { handleError } from "../utils/error.mts";
import { adminData, BACKEND_URL } from "../utils/constant";
import type * as type from "../utils/type";
import FormData from "form-data";
import { readFileSync } from "fs";
import path from "path";

const API_PLAN = BACKEND_URL + "plans";
const API_IMAGES_TO_PLAN = BACKEND_URL + "plans/image-to-plan";

async function createPlan(plan: type.PlanType, adminToken: string) {
  const { images, ...planMeta } = plan;
  const headers = {
    "x-auth-token": adminToken,
  };
  try {
    let response = await axios.post(API_PLAN, planMeta, { headers });

    // Upload images
    if (images) {
      const formData = new FormData();
      for (const image of images) {
        const fileData = readFileSync(image.path);
        const fileName = path.basename(image.path);

        formData.append("images", fileData, {
          filename: fileName,
        });
      }
      const endPoint = `${API_IMAGES_TO_PLAN}/${response.data._id}`;

      response = await axios.patch(endPoint, formData, { headers });
    }

    return {
      success: true,
      status: response.status,
      data: response.data,
      contentType: response.headers["content-type"],
      error: "",
    };
  } catch (error) {
    const data = handleError(error);
    return {
      ...data,
      success: false,
    };
  }
}

async function getAllPlans() {
  try {
    const headers = { "x-auth-token": adminData.token };
    const response = await axios.get(API_PLAN, { headers });

    return {
      success: true,
      status: response.status,
      data: response.data,
      contentType: response.headers["content-type"],
      error: "",
    };
  } catch (error) {
    const data = handleError(error);
    return {
      ...data,
      success: false,
    };
  }
}

export { createPlan, getAllPlans };
