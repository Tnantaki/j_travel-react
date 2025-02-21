import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { FieldError } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClass?: string;
  error?: FieldError
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, inputClass, error, ...props }, ref) => {

    return (
      <div className="flex flex-col font-inter font-medium sm:gap-2 md:gap-4">
        {label && (
          <label
            htmlFor={props.name}
            className="text-lg sm:text-xl lg:text-2xl"
          >
            {label}
          </label>
        )}
        <div className="relative mb-6">
          <input
            {...props}
            ref={ref}
            className={cn(
              "bg-white text-base h-10 rounded-md w-full text-dark-primary font-normal p-4 focus:outline-1 focus:outline-dark-secondary sm:text-lg sm:h-12 sm:rounded-lg lg:text-xl lg:h-14",
              inputClass
            )}
          />
          {error && <p className="text-error text-sm mt-0.5 absolute drop-shadow-lg sm:text-base sm:mt-1">{error.message}</p>}
        </div>
      </div>
    );
  }
);

export default Input;
