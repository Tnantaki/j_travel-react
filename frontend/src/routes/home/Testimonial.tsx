import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaAddressCard } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";

const Testimonial = () => {
  const exps = [
    {
      icon: BiSolidPlaneAlt,
      amount: 120,
      unit: "Total Tours Completed",
    },
    {
      icon: FaAddressCard,
      amount: 8,
      unit: "Experienced Guides",
    },
    {
      icon: AiFillLike,
      amount: 2,
      unit: "Years of Experience",
    },
  ];

  return (
    <section className="flex bg-frame-ter sec-padding text-char-sec">
      <div className="flex flex-col  items-center page-container sec-margin">
        <h2 className="mb-16">Why Choose Us?</h2>
        <ul className="flex justify-evenly w-full">
          {exps.map((exp, idx) => (
            <li key={idx} className="flex flex-col text-center items-center gap-4">
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
