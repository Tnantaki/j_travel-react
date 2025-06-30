import apiClients from "./api-clients";
import { ResMemberGroupType } from "./group-service";
import { PlanType } from "./plan-service";

interface ReqBookingType {
  plan: string;
  group: string;
  firstDay: string;
  lastDay: string;
}

interface ResBookingType {
  _id: string;
  plan: PlanType;
  group: ResMemberGroupType;
  firstDay: string;
  lastDay: string;
  status: string;
  paymentStatus: string;
}

export interface BookingType {
  _id: string;
  plan: PlanType;
  group: ResMemberGroupType;
  firstDay: string;
  lastDay: string;
  status: string;
  paymentStatus: string;
}

class bookingService {
  createBooking(booking: ReqBookingType) {
    return apiClients.post("/bookings", booking);
  }

  getBooking() {
    const controller = new AbortController();

    const request = apiClients.get<ResBookingType[]>("/bookings/me", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new bookingService();
