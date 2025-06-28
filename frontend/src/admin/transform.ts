export interface ImageType {
  file: {
    rawFile: File;
  };
  tag: string;
  caption: string;
}

interface ScheduleType {
  day: number;
  title: string;
  events: string[];
}

export interface PlanType {
  type: "private" | "tour";
  title: string;
  description: string;
  price: number;
  duration: number;
  schedules: ScheduleType[];
}

export function handleFormImage(images: ImageType[]) {
  if (images.length === 0) {
    return undefined;
  }
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image.file.rawFile); // .rawFile is important in react-admin
    if (image.tag) {
      formData.append("tag", image.tag);
    }
    if (image.caption) {
      formData.append("caption", image.caption);
    }
  });
  return formData;
}

export function handlePlanData(plan: PlanType) {
  const schedules = plan.schedules.map((schedule, idx) => ({
    ...schedule,
    day: idx + 1,
    events: schedule.events || [],
  }));

  const data = {
    ...plan,
    schedules,
    duration: schedules.length,
  };

  return data;
}
