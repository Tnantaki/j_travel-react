import { MemberType } from "../contexts/BookingProvider";
import apiClients from "./api-clients";

export interface MemberInput {
  name: string;
  birthday: Date;
  gender: "male" | "female";
  phone: string;
}

interface PlanType {
  _id: string;
  image: string;
  type: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}

interface GroupType {
  _id: string;
  leader: MemberType;
  plan: string;
  members: MemberType[];
}

export interface BookingRequest {
  plan: string;
  group: string;
  firstDay: string;
  lastDay: string;
}

export interface BookingResponse {
  _id: string;
  plan: PlanType;
  group: GroupType;
  firstDay: string;
  lastDay: string;
  status: string;
  paymentStatus: string;
}

export interface BookingType {
  _id: string;
  plan: PlanType;
  group: GroupType;
  firstDay: Date;
  lastDay: Date;
  status: string;
  paymentStatus: string;
}

class bookingService {
  createBooking(booking: BookingRequest) {
    return apiClients.post("/bookings", booking);
  }

  getBooking() {
    const controller = new AbortController();

    const request = apiClients.get<BookingResponse[]>("/bookings/me", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new bookingService();
