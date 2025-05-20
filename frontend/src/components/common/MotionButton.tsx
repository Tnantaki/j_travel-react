import { motion } from "motion/react";
import { cn } from "../../utils/cn";
import { buttonVariants } from "../../variants/button";

type ButtonVariant = "primary" | "outline" | "success";
type SizeButton = "sm" | "md" | "lg";
type RoundedButton = "round" | "full";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: SizeButton;
  rounded?: RoundedButton;
}

type MotionButtonProps = React.ComponentPropsWithoutRef<typeof motion.button>;

interface Props extends MotionButtonProps, ButtonProps {}

const MotionButton = ({
  variant,
  size,
  rounded,
  disabled,
  className,
  ...props
}: Props) => {
  return (
    <motion.button
      {...props}
      disabled={disabled}
      whileHover={{
        y: "-2px",
      }}
      className={cn(
        "hover:shadow-lg shadow-blue-700/50",
        buttonVariants({ variant, size, rounded, disabled, className })
      )}
    >
      {props.children}
    </motion.button>
  );
};

export default MotionButton;
