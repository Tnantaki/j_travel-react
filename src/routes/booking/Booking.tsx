import { NavLink, Outlet } from "react-router";
import { HiUserGroup } from "react-icons/hi2";
import { BiSolidNotepad } from "react-icons/bi";
import { IoCalendar } from "react-icons/io5";
import { MdPaid } from "react-icons/md";
import { useState } from "react";
import LinkButton from "../../components/LinkButton";

const Booking = () => {
  const [stepNum, setStepNum] = useState(1);

  const steps = [
    { image: HiUserGroup, label: "create group", to: "/booking/member" },
    { image: BiSolidNotepad, label: "choose package", to: "/booking/package" },
    { image: IoCalendar, label: "select date", to: "/booking/date" },
    { image: MdPaid, label: "pay", to: "/booking/pay" },
  ];

  return (
    <section className="bg-dark-primary justify-center hero sec-padding">
      <div className="page-container flex flex-col items-center my-5 min-h-full">
        <h3 className="text-white self-start mb-4">Booking</h3>
        <div className="flex flex-row bg-dark-grey w-full rounded-2xl justify-evenly mb-6">
          {steps.map((step, idx) => (
            <NavLink
              key={idx}
              to={step.to}
              className={({ isActive }) =>
                `p-2 text-center rounded-r-lg flex flex-col items-center text-grey ${
                  isActive && "text-primary font-bold"
                }`
              }
            >
              {/* <img src={step.image} className="size-8" /> */}
              <div className="border-2 rounded-full size-8 flex items-center justify-center">
                <step.image size={18} />
              </div>
              <p className="body3">{`Step ${idx + 1}`}</p>
              <p>{step.label}</p>
            </NavLink>
          ))}
        </div>
        <div className="flex flex-col bg-dark-grey w-full p-8 rounded-2xl gap-6 h-full">
          <Outlet />
          {stepNum < 4 && (
            <LinkButton to={steps[stepNum].to} className="self-start" onClick={() => setStepNum(stepNum + 1)}>Confirm</LinkButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;
