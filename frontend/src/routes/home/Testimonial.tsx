import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaAddressCard } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";

const Testimonial = () => {
  const exps = [
    {
      icon: BiSolidPlaneAlt,
      amount: 125_000,
      unit: "Total Tours Completed",
    },
    {
      icon: FaAddressCard,
      amount: 60,
      unit: "Experienced Guides",
    },
    {
      icon: AiFillLike,
      amount: 20,
      unit: "Years of Experience",
    },
  ];

  return (
    <section className="flex bg-frame-ter sec-padding text-char-sec">
      <div className="flex flex-col  items-center page-container sec-margin">
        <h2 className="mb-16">Why Choose Us?</h2>
        <ul className="flex flex-col gap-4 sm:flex-row justify-evenly w-full">
          {exps.map((exp, idx) => (
            <li key={idx} className="flex flex-col gap-2 text-center items-center sm:gap-4">
              <exp.icon className="size-10" />
              <h2>{exp.amount}</h2>
              <h4>{exp.unit}</h4>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonial;
