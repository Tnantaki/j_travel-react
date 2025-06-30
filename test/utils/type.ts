interface ApiResponse<T = any> {
  success: boolean;
  status?: number;
  data?: T;
  error?: string;
  details?: string;
  contentType?: string;
}

interface User {
  email: string;
  password: string;
  isAdmin?: boolean;
}
interface UserData {
  email: string;
  password: string;
  token: string
  id: string
}

interface ProfileData {
  token: string;
  name: string;
  email: string;
}

interface ScheduleType {
  day: number;
  title: string;
  events: string[];
}

interface PlanType {
  type: "private" | "tour";
  title: string;
  description: string;
  price: number;
  duration: number;
  schedules: ScheduleType[];
  images?: {
    name: string;
    path: string;
  }[];
}

interface ResponsePlanType {
  _id: string
}


export type { ApiResponse, ProfileData, User, UserData, PlanType, ResponsePlanType };
