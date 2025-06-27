import axios from "axios";
import { handleError } from "../utils/error.mts";
import { BACKEND_URL } from "../utils/constant";
import type { PlanType } from "../utils/type";

const API_PLAN = BACKEND_URL + "plans";

async function createPlan(plan: PlanType, adminToken: string) {
  const headers = {
    "x-auth-token": adminToken,
  };
  try {
    const response = await axios.post(API_PLAN, plan, { headers });

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

export { createPlan };
