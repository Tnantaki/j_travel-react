import { ReactNode } from "react";
import BaseButton, { SizeButton } from "./BaseButton";

interface Props {
  children: ReactNode;
  size: SizeButton;
  primary: boolean;
  className?: string;
}

const Button = (props: Props) => {
  return (
    <BaseButton as="button" {...props} />
  );
};

export default Button;
