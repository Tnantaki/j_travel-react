import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  inputClass?: string
}
const Input = ({label, name, inputClass, ...otherProps}: Props) => {
  return (
    <div className="flex flex-col font-inter font-medium gap-4">
      <label htmlFor={name} className="text-2xl">
        {label}
      </label>
      <input
        id={name}
        type={name}
        {...otherProps}
        className={`bg-white text-xl h-14 rounded-lg w-full text-dark-primary font-normal p-4 focus:outline-1 focus:outline-dark-secondary ${inputClass}`}
      />
    </div>
  );
};

export default Input;
