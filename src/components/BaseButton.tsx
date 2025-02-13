import { ButtonHTMLAttributes } from "react";
import { Link } from "react-router";

export type SizeButton = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  as: "button" | "link";
  size: SizeButton;
  primary: boolean;
  className?: string;
  to?: string;
}

const BaseButton = ({
  as = "button",
  size,
  primary,
  className,
  to,
  children,
  ...props
}: Props) => {
  const classSize: Record<SizeButton, string> = {
    sm: "rounded-xl py-1 px-5 font-medium text-lg",
    md: "rounded-xl py-3 px-5 font-semibold text-xl gap-3",
    lg: "rounded-xl py-3.5 px-6 font-semibold text-2xl gap-3",
  };

  const classColor = primary
    ? "bg-primary text-white hover:brightness-125"
    : "text-primary hover:bg-primary hover:text-white";

  const baseClass =
    "font-inter border-2 border-primary flex justify-center items-center cursor-pointer";

  if (as === "link" && to) {
    return (
      <Link
        to={to}
        className={`${baseClass} ${classColor} ${classSize[size]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${baseClass} ${classColor} ${classSize[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
