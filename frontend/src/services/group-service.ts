import apiClients from "./api-clients";

export interface GroupType {
  leader: string;
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

  // getProfile() {
  //   const controller = new AbortController();

  //   const request = apiClients.get<ProfileAPI>("/profiles/me", {
  //     signal: controller.signal,
  //   });
  //   return { request, cancel: () => controller.abort() };
  // }

  // deleteProfile() {
  //   return apiClients.delete("/profiles/me");
  // }
}

export default new GroupService();
