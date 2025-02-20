import { Link, LinkProps } from "react-router";
import { cn } from "../utils/cn";
import { ButtonProps, ButtonVariants } from "./Button";

interface Props extends LinkProps, ButtonProps {}

const LinkButton = ({ variant, size, rounded, className, to, ...props }: Props) => {
  return (
    <Link
      to={to}
      {...props}
      className={cn(ButtonVariants({ variant, size, rounded, className }))}
     />
  )
};

export default LinkButton;
