import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  inputClass?: string
}
const Input = ({label, name, inputClass, ...otherProps}: Props) => {
  return (
    <div className="flex flex-col font-inter font-medium gap-1 sm:gap-2 md:gap-4">
      <label htmlFor={name} className="text-lg sm:text-xl lg:text-2xl">
        {label}
      </label>
      <input
        id={name}
        type={name}
        {...otherProps}
        className={`bg-white text-base h-10 rounded-md w-full text-dark-primary font-normal p-4 focus:outline-1 focus:outline-dark-secondary ${inputClass} sm:text-lg sm:h-12 sm:rounded-lg lg:text-xl lg:h-14`}
      />
    </div>
  );
};

export default Input;
