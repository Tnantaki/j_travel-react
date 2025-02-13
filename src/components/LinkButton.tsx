import { ReactNode } from "react";
import BaseButton, { SizeButton } from "./BaseButton";

interface Props {
  children: ReactNode;
  to: string;
  size: SizeButton;
  primary: boolean;
  className?: string;
}

const LinkButton = ({ children, to, size, primary, className }: Props) => {
  return (
    <BaseButton
      as="link"
      to={to}
      size={size}
      primary={primary}
      className={className}
    >
      {children}
    </BaseButton>
  );
};

export default LinkButton;
