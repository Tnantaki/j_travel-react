import { cva } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";

type SizeInput = "md" | "lg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  sizeInput?: SizeInput;
  inputClass?: string;
}

const InputInfoVariants = cva(
  "px-3 py-1.5 text-neutral-white w-full focus:outline-1 focus:outline-dark-secondary",
  {
    variants: {
      disabled: {
        false: "rounded-lg border-1 bg-dark-grey-tint border-dark-grey-shade",
        true: "",
      },
      sizeInput: {
        md: "font-medium text-lg",
        lg: "font-semibold text-2xl",
      },
    },
    defaultVariants: {
      disabled: false,
      sizeInput: "md",
    },
  }
);

const InputInfo = ({
  label,
  name,
  type,
  disabled,
  sizeInput,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col font-inter">
      <label
        htmlFor={name}
        className={`ps-3 text-base font-normal ${
          disabled ? "text-grey" : "text-light-grey "
        }`}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...props}
        className={cn(InputInfoVariants({ disabled, sizeInput }))}
        disabled={disabled}
        style={{ colorScheme: "dark" }}
      />
    </div>
  );
};

export default InputInfo;
