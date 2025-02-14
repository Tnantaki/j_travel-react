import { ReactNode } from "react";
import BaseButton, { SizeButton } from "./BaseButton";

interface Props {
  children: ReactNode;
  to: string;
  size: SizeButton;
  primary: boolean;
  className?: string;
  onClick?: () => void
}

const LinkButton = ({ children, to, size, primary, className, onClick }: Props) => {
  return (
    <BaseButton
      as="link"
      to={to}
      size={size}
      primary={primary}
      className={className}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
};

export default LinkButton;
