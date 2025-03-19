import { HiUserGroup } from "react-icons/hi2";
import { BiSolidNotepad } from "react-icons/bi";
import { IoCalendar } from "react-icons/io5";
import { MdPaid } from "react-icons/md";
import { Fragment, useState } from "react";
import Button from "../../components/common/Button";
import Member from "./Member";
import Package from "./Package";
import DateSelect from "./DateSelect";
import Pay from "./Pay";
import { cn } from "../../utils/cn";

const Booking = () => {
  const [stepNum, setStepNum] = useState(1);
  const nextStep = () => setStepNum(stepNum + 1);
  const prevStep = () => setStepNum(stepNum - 1);

  const steps = [
    { image: HiUserGroup, label: "create group" },
    { image: BiSolidNotepad, label: "choose package" },
    { image: IoCalendar, label: "select date" },
    { image: MdPaid, label: "pay" },
  ];

  return (
    <section className="bg-dark-primary justify-center hero sec-padding">
      <div className="page-container flex flex-col items-center my-5 min-h-full">
        <h3 className="text-white self-start mb-4">Booking</h3>
        <ul className="flex flex-row items-center bg-dark-grey w-full rounded-2xl justify-evenly mb-6 px-12 pt-9 pb-2">
          {steps.map((step, idx) => (
            <Fragment key={idx}>
              <li className="flex flex-col items-center gap-2 relative">
                <p
                  className={cn(
                    "body3 font-semibold absolute -top-7 text-nowrap",
                    idx < stepNum ? "text-primary" : "text-neutral-white"
                  )}
                >
                  {step.label}
                </p>
                <div
                  className={cn(
                    "rounded-full bg-transparent size-11 flex items-center justify-center",
                    idx < stepNum ? "bg-primary" : "bg-dark-primary"
                  )}
                >
                  <step.image className="size-7 fill-neutral-white" />
                </div>
              </li>

              {/* Connecting Line */}
              {idx + 1 < steps.length && (
                <div className="flex-1 h-1 relative items-center">
                  <div className="absolute inset-0 bg-dark-primary"></div>
                  <div
                    className="absolute inset-0 bg-primary transition-all duration-300"
                    style={{
                      width: idx + 1 < stepNum ? "100%" : "0%",
                    }}
                  ></div>
                </div>
              )}
              <li></li>
            </Fragment>
          ))}
        </ul>
        <div className="flex flex-col bg-dark-grey w-full p-8 rounded-2xl gap-6 h-full">
          {stepNum === 1 && <Member />}
          {stepNum === 2 && <Package />}
          {stepNum === 3 && <DateSelect />}
          {stepNum === 4 && <Pay />}
          <div className="flex justify-between">
            <div>
              {stepNum > 1 && (
                <Button rounded="full" onClick={prevStep}>
                  Previous
                </Button>
              )}
            </div>
            <div>
              {stepNum < 4 && (
                <Button rounded="full" onClick={nextStep}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
