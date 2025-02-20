import { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../utils/cn";

type ButtonVariant = "primary" | "outline";
type SizeButton = "sm" | "md" | "lg";
type RoundedButton = "round" | "full";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: SizeButton;
  rounded?: RoundedButton;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {}

const ButtonVariants = cva(
  "font-inter border-2 border-primary flex justify-center items-center cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:brightness-125",
        outline: "text-primary hover:bg-primary hover:text-white",
      },
      size: {
        sm: "rounded-md py-1 px-5 font-medium text-lg",
        md: "rounded-lg py-1.5 px-5 font-semibold text-base gap-1 sm:text-xl sm:py-2.5 sm:gap-3 md:text-xl md:py-3 md:rounded-xl",
        lg: "rounded-xl py-3.5 px-6 font-semibold text-2xl gap-3",
      },
      rounded: {
        round: "",
        full: "rounded-full md:rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Button = ({ variant, size, rounded, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={cn(ButtonVariants({ variant, size, rounded, className }))}
    />
  );
};

export default Button;
export { ButtonVariants };
