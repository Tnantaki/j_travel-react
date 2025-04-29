import { Link, LinkProps } from "react-router";
import { motion } from "motion/react";
import { cn } from "../../utils/cn";
import { ButtonProps } from "./Button";
import { buttonVariants } from "../../variants/button";
import type { MotionProps } from "motion/react";

const MotionLink = motion(Link);

interface Props extends MotionProps, ButtonProps {
  to: LinkProps["to"];
  className?: string;
}

const MotionLinkButton = ({
  variant,
  size,
  rounded,
  className,
  to,
  children,
  ...props
}: Props) => {
  return (
    <MotionLink
      {...props}
      to={to}
      type="button"
      whileHover={{
        y: "-2px",
      }}
      className={cn(
        "hover:shadow-lg shadow-blue-700/50",
        buttonVariants({ variant, size, rounded, className })
      )}
    >
      {children}
    </MotionLink>
  );
};

export default MotionLinkButton;
