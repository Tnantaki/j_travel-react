import { motion } from "motion/react";
import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: string;
  id: string;
  label: string;
}

const ButtonRadio = ({ id, label, name, className }: Props) => {
  return (
    <motion.div
      whileHover={{
        y: "-2px",
      }}
      className={cn("hover:shadow-lg shadow-blue-700/50", className)}
    >
      <input
        type="radio"
        name={name}
        id={id}
        value={id}
        className="hidden peer"
        defaultChecked
      />
      <label
        htmlFor={id}
        className="py-2 px-4 bg-frame-pri rounded-md border-frame-pri peer-checked:border-char-pri peer-checked:bg-primary peer-checked:text-char-sec hover:cursor-pointer"
      >
        {label}
      </label>
    </motion.div>
  );
};

export default ButtonRadio;
