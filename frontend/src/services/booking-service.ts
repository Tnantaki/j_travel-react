import apiClients from "./api-clients";
import { ResMemberGroupType } from "./group-service";
import { PlanType } from "./plan-service";

export type Status =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "traveling"
  | "completed";

interface BookingReq {
  plan: string;
  group: string;
  firstDay: string;
  lastDay: string;
}

interface BookingRes {
  _id: string;
  plan: PlanType;
  group: ResMemberGroupType;
  firstDay: string;
  lastDay: string;
  status: Status;
  paymentStatus: string;
}

export interface Booking {
  _id: string;
  plan: PlanType;
  group: ResMemberGroupType;
  firstDay: string;
  lastDay: string;
  status: Status;
  paymentStatus: string;
}

class bookingService {
  createBooking(booking: BookingReq) {
    return apiClients.post("/bookings", booking);
  }

  getAll() {
    const controller = new AbortController();

    const request = apiClients.get<BookingRes[]>("/bookings/me", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getOne() {
    const controller = new AbortController();

    const getBooking = (bookingId: string) =>
      apiClients.get<Booking>(`/bookings/${bookingId}`, {
        signal: controller.signal,
      });
    return { getBooking, cancel: () => controller.abort() };
  }

  pay(bookingId: string) {
    return apiClients.patch(`bookings/pay-booking/${bookingId}`);
  }

  cancel(bookingId: string) {
    return apiClients.patch(`bookings/cancel-booking/${bookingId}`);
  }

}

export default new bookingService();
