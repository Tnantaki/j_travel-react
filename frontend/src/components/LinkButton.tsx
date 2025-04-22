import { Link, LinkProps } from "react-router";
import { cn } from "../utils/cn";
import { ButtonProps } from "./common/Button";
import { buttonVariants } from "../variants/button";

interface Props extends LinkProps, ButtonProps {}

const LinkButton = ({
  variant,
  size,
  rounded,
  className,
  to,
  ...props
}: Props) => {
  return (
    <Link
      type="button"
      to={to}
      {...props}
      className={cn(buttonVariants({ variant, size, rounded, className }))}
    />
  );
};

export default LinkButton;
