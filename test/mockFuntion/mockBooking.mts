import axios from "axios";
import { BACKEND_URL } from "../utils/constant";
import { handleError } from "../utils/error.mts";
import type { PlanType, UserData } from "../utils/type";

const API_GROUP = BACKEND_URL + "groups";
const API_BOOKING = BACKEND_URL + "bookings";

async function createGroup(
  planId: string,
  leader: UserData,
  members: UserData[] = []
) {
  try {
    const headers = { "x-auth-token": leader.token };
    const groups = {
      plan: planId,
      members: members.map((mem) => mem.id),
    };

    const response = await axios.post(API_GROUP, groups, { headers });

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

async function createBooking(
  planId: string,
  leader: UserData,
  members: UserData[] = []
) {
  try {
    const headers = { "x-auth-token": leader.token };
    const result = await createGroup(planId, leader, members);

    const booking = {
      plan: planId,
      group: result.data._id,
      firstDay: "2025-05-15T00:00:00.000Z",
      lastDay: "2025-05-21",
    };

    const response = await axios.post(API_BOOKING, booking, { headers });

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

export { createGroup, createBooking };
