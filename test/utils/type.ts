interface ApiResponse<T = any> {
  success: boolean;
  status?: number;
  data?: T;
  error?: string;
  details?: string;
  contentType?: string;
}

interface UserData {
  email: string;
  password: string;
  isAdmin?: boolean;
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

export type { ApiResponse, ProfileData, UserData, PlanType };
