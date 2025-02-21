import { cva } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { UseFormRegister } from "react-hook-form";
import { ProfileInputs } from "../routes/profile/Profile";

type SizeInput = "md" | "lg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof ProfileInputs;
  label?: string;
  register: UseFormRegister<ProfileInputs>;
  sizeInput?: SizeInput;
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
  disabled,
  sizeInput,
  className,
  register,
  ...props
}: Props) => {
  console.log(props);
  return (
    <div className="flex flex-col font-inter">
      {label && (
        <label
          htmlFor={name}
          className={`ps-3 text-base font-normal ${
            disabled ? "text-grey" : "text-light-grey "
          }`}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        disabled={disabled}
        {...register(name)}
        {...props}
        className={cn(InputInfoVariants({ disabled, sizeInput, className }))}
        style={{ colorScheme: "dark" }} // for caledar picker icon
      />
    </div>
  );
};

export default InputInfo;
