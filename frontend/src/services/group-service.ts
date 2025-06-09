import apiClients from "./api-clients";

export interface GroupType {
  plan: string;
  members: string[];
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
}

export default new GroupService();
