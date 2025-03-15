import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const OAuthButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={`flex justify-center items-center rounded-lg py-1.5 px-5 font-semibold text-base gap-1 border-2 sm:text-xl sm:py-2.5 sm:gap-3 md:text-xl md:py-3 md:rounded-xl hover:cursor-pointer hover:bg-black/20 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default OAuthButton;
