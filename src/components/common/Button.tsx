import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { buttonVariants } from "../../variants/button";

type ButtonVariant = "primary" | "outline";
type SizeButton = "sm" | "md" | "lg";
type RoundedButton = "round" | "full";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: SizeButton;
  rounded?: RoundedButton;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {}

const Button = ({
  variant,
  size,
  rounded,
  disabled,
  className,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        buttonVariants({ variant, size, rounded, disabled, className })
      )}
    />
  );
};

export default Button;
