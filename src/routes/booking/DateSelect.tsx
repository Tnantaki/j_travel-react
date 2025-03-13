import { useState } from "react";
import datePackages from "../data/datePackages";

const DateSelect = () => {
  const [selected, setSelected] = useState(datePackages[0].start.toDateString())

  return (
    <div className="flex flex-col w-full h-full">
      <h4 className="mb-2">Choose Package</h4>
      <div className="flex flex-col w-full rounded-lg border-1 border-lg border-grey p-6 gap-4 h-full">
        <form>
          <ul className="flex flex-col p-2 gap-2">
            {datePackages.map((item, idx) => (
              <li key={idx}>
                <input
                  type="radio"
                  id={item.start.toDateString()}
                  name="package"
                  value={item.start.toDateString()}
                  className="hidden peer"
                  checked={selected === item.start.toDateString()}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label
                  htmlFor={item.start.toDateString()}
                  className="bg-dark-grey-shade border-grey border-1 flex flex-row px-6 py-4 rounded-md cursor-pointer peer-checked:text-primary peer-checked:border-primary"
                >
                  <p className="body1 font-medium w-full">
                    {item.start.toDateString()}
                  </p>
                </label>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default DateSelect;
