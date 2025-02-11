import { ReactNode } from "react";

type Size = 'sm' | 'md' | 'lg'

interface Props {
  children: ReactNode
}

const Button = ({ children }: Props) => {
  // const classSize: Record<Size, string> = {
  //   sm: "rounded-xl pt-3.5 pb-3 px-[1.375rem] font-medium",
  //   md: "rounded-2xl py-[1.375rem] px-10 font-bold tracking-[0.075em] uppercase",
  //   lg: "rounded-2xl py-[1.375rem] px-16 font-bold tracking-[0.075em] uppercase",
  // };

  return <button className="">{children}</button>;
};

export default Button;
