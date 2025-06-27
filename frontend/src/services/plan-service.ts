import apiClients from "./api-clients";

interface ScheduleType {
  day: number;
  title: string;
  events: string[];
}

interface ImageType {
  _id: string;
  imageUrl: string;
  fileName: string;
}

export interface PlanType {
  _id: string
  type: "private" | "tour";
  title: string;
  description: string;
  price: number;
  duration: number;
  schedules: ScheduleType[];
  images: ImageType[];
}

class PlanService {
  getAll() {
    const controller = new AbortController();

    const getAll = apiClients.get<PlanType>("/plans", {
      signal: controller.signal,
    });
    return { getAll, cancel: () => controller.abort() };
  }
}

export default new PlanService();
