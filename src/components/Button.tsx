import { ReactNode } from "react";

type Size = 'sm' | 'md'

interface Props {
  children: ReactNode
  size: Size
  primary: boolean
}

const Button = ({ children, size, primary }: Props) => {
  const classSize: Record<Size, string> = {
    sm: "rounded-xl py-2 px-5 font-medium text-lg",
    md: "rounded-xl py-3.5 px-6 font-semibold text-xl gap-3",
  };

  const classColor = primary ? 'bg-primary text-white hover:brightness-125' : 'text-primary hover:bg-[#2E2F35] hover:text-white'

  return <button className={`border-2 border-primary flex items-center cursor-pointer ${classColor} ${classSize[size]}`}>{children}</button>;
};

export default Button;
