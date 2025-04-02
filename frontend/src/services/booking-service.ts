import apiClients from "./api-clients";

export interface MemberInput {
  name: string;
  birthday: Date;
  gender: "male" | "female";
  phone: string;
}

class bookingService {
  addMember(member: MemberInput) {
    return apiClients.post("/members", member);
  }

  getMembers() {
    return apiClients.get<MemberInput[]>("/members");
  }

  deleteMember(id: string) {
    return apiClients.delete(`/members/${id}`);
  }
}

export default new bookingService();
