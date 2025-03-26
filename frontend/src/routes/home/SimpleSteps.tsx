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
        <ul className="flex flex-col justify-between w-[700px]">
          {steps.map((step, idx) => (
            <li key={idx} className="flex flex-row text-center items-center not-last:border-b-2 border-dashed border-frame-sec-shade">
              <div className="self-start relative z-10 h-full">
                <div className="rounded-full bg-frame-sec-shade shadow-xl border-1 border-slate-200 size-14 flex justify-center items-center z-[1] relative -translate-y-1/2">
                  <h4>{idx + 1}</h4>
                </div>
                <div
                  className={cn(
                    "absolute top-0 left-[50%] z-[0] w-6 h-full -translate-x-1/2",
                    step.bgStrip
                  )}
                ></div>
              </div>
              <div className="flex items-center gap-4 p-8">
                <div className="px-8">
                  <step.icon className="size-12" />
                </div>
                <div className="flex flex-col items-center gap-4 ml-4">
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
