import { cva } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { cn } from "../utils/cn";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type SizeInput = "md" | "lg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  sizeInput?: SizeInput;
}

const InputInfoVariants = cva(
  "px-3 py-1.5 text-char-pri w-full focus:outline-1 focus:outline-frame-sec",
  {
    variants: {
      disabled: {
        false: "rounded-lg border-1 border-frame-ter bg-char-sec",
        true: "bg-char-sec border-1 rounded-lg border-char-ter",
      },
      sizeInput: {
        md: "font-medium text-lg",
        lg: "font-medium text-xl",
      },
    },
    defaultVariants: {
      disabled: false,
      sizeInput: "md",
    },
  }
);

const InputInfo = forwardRef<HTMLInputElement, Props>(
  ({ label, name, disabled, sizeInput, className, ...props }: Props, ref) => {
    const [toggleEye, setToggleEye] = useState(false);

    return (
      <div className={cn("flex flex-col font-inter", className)}>
        {label && (
          <label
            htmlFor={name}
            className={`ps-3 text-base font-normal ${
              disabled ? "text-slate-500" : "text-char-pri-tint"
            }`}
          >
            {label}
          </label>
        )}
        {props.type === "password" ? (
          <div
            className={cn(
              "bg-white text-char-pri flex items-center text-base h-10 rounded-md w-full font-normal p-4 focus-within:outline-2 focus-within:outline-primary sm:text-lg sm:h-12 sm:rounded-lg lg:text-xl lg:h-14",
              InputInfoVariants({ disabled, sizeInput }),
              "disabled:bg-gray-300"
            )}
          >
            <input
              {...props}
              type={toggleEye ? "text" : "password"}
              id={name}
              disabled={disabled}
              name={name}
              ref={ref}
              className="focus:outline-0 w-full"
            />
            <div className="cursor-pointer ms-2">
              {toggleEye ? (
                <FaEyeSlash onClick={() => setToggleEye(false)} />
              ) : (
                <FaEye onClick={() => setToggleEye(true)} />
              )}
            </div>
          </div>
        ) : (
          <input
            id={name}
            disabled={disabled}
            ref={ref}
            name={name}
            {...props}
            className={cn(
              InputInfoVariants({ disabled, sizeInput }),
              "disabled:bg-gray-300"
            )}
            style={{ colorScheme: "light" }} // for caledar picker icon
          />
        )}
      </div>
    );
  }
);

export default InputInfo;
