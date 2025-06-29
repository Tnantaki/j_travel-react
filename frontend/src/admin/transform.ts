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

export interface PlanInput extends PlanType {
  images: ImageType[];
}

export function handleFormImage(images: ImageType[]) {
  if (images.length === 0) {
    return undefined;
  }
  const formData = new FormData();

  let countFile = 0
  images.forEach((image) => {
    console.log(image)
    if (!image.file.rawFile) {
      return;
    }

    formData.append("images", image.file.rawFile); // .rawFile is important in react-admin
    countFile++
    if (image.tag) {
      formData.append("tag", image.tag);
    }
    if (image.caption) {
      formData.append("caption", image.caption);
    }
  });

  if (countFile === 0) {
    return undefined
  }

  return formData;
}

function handlePlanData(plan: PlanType) {
  const schedules = plan.schedules.map((schedule, idx) => ({
    day: idx + 1,
    title: schedule.title,
    events: schedule.events || [],
  }));

  const data: PlanType = {
    type: plan.type,
    title: plan.title,
    description: plan.description,
    price: plan.price,
    schedules,
    duration: schedules.length,
  };

  return data;
}

export const transformPlanData = (data: PlanInput) => {
  const { images, ...planMeta } = data;
  const formData = handleFormImage(images);
  const plan = handlePlanData(planMeta);

  return { plan, formData };
};
