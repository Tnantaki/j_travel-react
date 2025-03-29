import { forwardRef, InputHTMLAttributes, useState } from "react";
import { cn } from "../../utils/cn";
import { FieldError } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClass?: string;
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, label, inputClass, type, error, ...props }, ref) => {
    const [toggleEye, setToggleEye] = useState(false);

    return (
      <div className="flex flex-col font-inter font-medium sm:gap-2 md:gap-4 text-char-sec">
        {label && (
          <label htmlFor={name} className="text-lg sm:text-xl lg:text-2xl">
            {label}
          </label>
        )}
        <div className="relative mb-6">
          <div
            className={cn(
              "bg-white text-char-pri flex items-center text-base h-10 rounded-md w-full font-normal p-4 focus-within:outline-2 focus-within:outline-primary sm:text-lg sm:h-12 sm:rounded-lg lg:text-xl lg:h-14",
              inputClass
            )}
          >
            <input
              type={toggleEye ? "text" : type}
              id={name}
              name={name}
              {...props}
              ref={ref}
              className="focus:outline-0 w-full"
            />
            {type === "password" && (
              <div className="cursor-pointer ms-2">
                {toggleEye ? (
                  <FaEyeSlash onClick={() => setToggleEye(!toggleEye)} />
                ) : (
                  <FaEye onClick={() => setToggleEye(!toggleEye)} />
                )}
              </div>
            )}
          </div>
          {error && (
            <p className="text-info-error flex items-center gap-1 text-sm mt-0.5 absolute drop-shadow-lg sm:text-base sm:mt-1">
              <FaExclamationCircle />
              {error.message}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
