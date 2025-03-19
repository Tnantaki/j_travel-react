import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const GenderInput = forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-base font-normal text-light-grey ps-3">Gender</p>
      <div className="flex flex-row gap-5 ps-2">
        <div className="flex gap-3">
          <input type="radio" id="female" value="Female" {...props} ref={ref} />
          <label
            htmlFor="female"
            className="text-neutral-white text-lg font-normal me-2"
          >
            Female
          </label>
        </div>
        <div className="flex gap-3">
          <input type="radio" id="male" value="Male" {...props} ref={ref} />
          <label
            htmlFor="male"
            className="text-neutral-white text-lg font-normal"
          >
            Male
          </label>
        </div>
      </div>
    </div>
  );
});

export default GenderInput;
