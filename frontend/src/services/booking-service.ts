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

class bookingService {
  createBooking(booking: BookingReqType) {
    return apiClients.post("/bookings", booking);
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
