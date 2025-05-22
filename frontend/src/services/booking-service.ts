import { MemberType } from "../contexts/BookingProvider";
import apiClients from "./api-clients";

export interface MemberInput {
  name: string;
  birthday: Date;
  gender: "male" | "female";
  phone: string;
}

export interface BookingReqType {
  plan: string
  group: string
  firstDay: string
  lastDay: string
}

interface PlanType {
  _id: string
  image: string
  type: string
  title: string
  description: string
  price: number
  duration: number
}

interface GroupType {
  _id: string
  leader: string
  plan: string
  members: MemberType[] 
}

interface BookingResponse {
  _id: string
  plan: PlanType
  group: GroupType
  firstDay: string
  lastDay: string
  status: string
  paymentStatus: string
}

export interface BookingType {
  _id: string
  plan: PlanType
  group: GroupType
  firstDay: Date
  lastDay: Date
  status: string
  paymentStatus: string
}

class bookingService {
  createBooking(booking: BookingReqType) {
    return apiClients.post("/bookings", booking);
  }

  getBooking() {
    const controller = new AbortController();

    const request = apiClients.get<BookingResponse[]>("/bookings/me", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
  // addMember(member: MemberInput) {
  //   return apiClients.post("/members", member);
  // }

  // getMembers() {
  //   return apiClients.get<MemberInput[]>("/members");
  // }

  // deleteMember(id: string) {
  //   return apiClients.delete(`/members/${id}`);
  // }
}

export default new bookingService();
