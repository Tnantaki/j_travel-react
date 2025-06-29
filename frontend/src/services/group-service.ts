import apiClients from "./api-clients";

export interface GroupType {
  plan: string;
  members: string[];
}

export interface ResMemberType {
  _id: string;
  username: string;
  email: string
}

class GroupService {
  createGroup(group: GroupType) {
    return apiClients.post("/groups", group);
  }

  // updateProfile(profile: ProfileType) {
  //   return apiClients.put("/profiles/me", this.convertProfileType(profile));
  // }

  getGroup() {
    const controller = new AbortController();

    const getGroup = apiClients.get<GroupType>("/groups/me", {
      signal: controller.signal,
    });
    return { getGroup, cancel: () => controller.abort() };
  }

  // deleteProfile() {
  //   return apiClients.delete("/profiles/me");
  // }

  searchMember(email: string) {
    return apiClients.get<ResMemberType[]>(
      `/groups/search-member?email=${email}&limit=5`
    );
  }
}

export default new GroupService();
