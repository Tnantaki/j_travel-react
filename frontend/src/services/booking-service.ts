import apiClients from "./api-clients";

export interface MemberType {
  name: string;
  region: string;
  age: number;
  gender: "male" | "female";
  phone: string;
}


class bookingService {
  addMember(member: MemberType) {
    return apiClients.post("/members", member);
  }

  getMembers() {
    return apiClients.get<MemberType[]>("/members");
  }

  deleteMember(id: string) {
    return apiClients.delete(`/members/${id}`);
  }
}

export default new bookingService();
