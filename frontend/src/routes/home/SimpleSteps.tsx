import { LuNotebookText } from "react-icons/lu";
import { TbMap2 } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { BsCardChecklist } from "react-icons/bs";
import { cn } from "../../utils/cn";

const SimpleSteps = () => {
  const steps = [
    {
      icon: LuNotebookText,
      title: "Fill in Details ",
      detail:
        "Begin by creating an account and providing your essential information, including your name, contact details, and number of travelers.",
      bgStrip: "bg-blue-900",
    },
    {
      icon: TbMap2,
      title: "Choose Travel Package",
      detail:
        "Select the one that best fits your interests and preferences. Whether it’s a traditional and modern, adventure and nature, or cultural tour.",
      bgStrip: "bg-blue-700",
    },
    {
      icon: IoCalendarOutline,
      title: "Select Travel Date",
      detail:
        "Pick a convenient date for your trip. Our system will show availability, ensuring you get the best experience on your chosen day.",
      bgStrip: "bg-blue-500",
    },
    {
      icon: BsCardChecklist,
      title: "Confirmation",
      detail:
        "Once you submit your booking, our team will review the details and send a confirmation via email or SMS. We will also provide additional information about meeting points, and any necessary preparations.",
      bgStrip: "bg-blue-300",
    },
  ];

  return (
    <section className="flex bg-frame-sec-tint sec-padding">
      <div className="flex flex-col items-center page-container sec-margin">
        <h2 className="mb-16">Book Your Dream Japan Tour in 4 Simple Steps</h2>
        <ul className="flex flex-col justify-between max-w-[700px]">
          {steps.map((step, idx) => (
            <li key={idx} className="flex flex-col mt-2 sm:flex-row sm:mt-0 text-center items-center sm:not-last:border-b-2 border-dashed border-frame-sec-shade">
              <div className="self-start relative z-10 w-full sm:w-auto sm:h-full">
                <div className="rounded-full bg-frame-sec-shade shadow-xl border-1 border-slate-200 size-10 sm:size-14 flex justify-center items-center z-[1] relative sm:-translate-y-1/2">
                  <h4>{idx + 1}</h4>
                </div>
                <div
                  className={cn(
                    "absolute rounded-full z-[0] h-4 w-full top-[50%] -translate-y-1/2 sm:translate-y-0 sm:top-0 sm:flex sm:left-[50%] sm:w-6 sm:h-full sm:-translate-x-1/2",
                    step.bgStrip
                  )}
                ></div>
              </div>
              <div className="flex flex-col p-2 sm:flex-row items-center gap-4 sm:p-8">
                <div className="px-8">
                  <step.icon className="size-8 sm:size-12" />
                </div>
                <div className="flex flex-col items-center gap-4 sm:ml-4">
                  <h4>{step.title}</h4>
                  <p className="body2">{step.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SimpleSteps;
