import apiClients from "./api-clients";
import { Gender } from "./profile-service";

// Request API Type
export interface ReqGroupType {
  plan: string;
  members: string[];
}

// Response API Type
export interface ResMemberType {
  _id: string;
  username: string; // name
  phone: string;
  birthday: string;
  gender: Gender;
}

export interface ResMemberGroupType {
  _id: string; // group id
  plan: string; // plan id
  leader: ResMemberType;
  members: ResMemberType[];
}

interface ResGroupType {
  leaderGroups: ResMemberGroupType[];
  memberGroup: ResMemberGroupType[];
}

// Client Component Type
export interface MemberType {
  id: string;
  name: string;
  birthday: Date;
  gender: Gender;
  phone: string;
}

export interface ResSearchedMemberType {
  _id: string;
  username: string;
  email: string;
}

class GroupService {
  createGroup(group: ReqGroupType) {
    return apiClients.post("/groups", group);
  }

  updateGroup(group: ReqGroupType, groupId: string) {
    return apiClients.put(`/groups/${groupId}`, group);
  }

  getGroup() {
    const controller = new AbortController();

    const getGroup = apiClients.get<ResGroupType>("/groups/me", {
      signal: controller.signal,
    });
    return { getGroup, cancel: () => controller.abort() };
  }

  deleteGroup(groupId: string) {
    return apiClients.delete(`/groups/${groupId}`);
  }

  searchMember(email: string) {
    return apiClients.get<ResSearchedMemberType[]>(
      `/groups/search-member?email=${email}&limit=5`
    );
  }

  // Declare overloads
  transformMember(member: ResMemberType): MemberType;
  transformMember(member: ResMemberType[]): MemberType[];

  // Provide single implementation
  transformMember(member: ResMemberType | ResMemberType[]) {
    const transform = (member: ResMemberType): MemberType => ({
      id: member._id,
      name: member.username,
      phone: member.phone,
      birthday: new Date(member.birthday),
      gender: member.gender,
    });

    if (Array.isArray(member)) {
      return member.map(transform);
    }
    return transform(member);
  }
}

export default new GroupService();
