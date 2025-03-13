import { useState } from "react";
import packages from "../data/packages";

const Package = () => {
  const [selected, setSelected] = useState(packages[0].id);

  return (
    <div className="flex flex-col w-full h-full">
      <h4 className="mb-2">Choose Package</h4>
      <div className="flex flex-col w-full rounded-lg border-1 border-lg border-grey p-6 gap-4 h-full">
        <form>
          <ul className="flex flex-col p-2 gap-2">
            {packages.map((item, idx) => (
              <li key={idx}>
                <input
                  type="radio"
                  id={item.id}
                  name="package"
                  value={item.id}
                  className="hidden peer"
                  checked={selected === item.id}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label
                  htmlFor={item.id}
                  className="bg-dark-grey-shade border-grey border-1 flex flex-row px-6 py-4 rounded-md cursor-pointer peer-checked:text-primary peer-checked:border-primary"
                >
                  <img className="size-20  rounded-sm" src={item.imgPath} />
                  <div className="flex flex-col px-6 w-full gap-1">
                    <p className="body1 font-medium border-b-1 border-primary/20 w-full">
                      {item.title}
                    </p>
                    <p>{item.description}</p>
                  </div>
                </label>
              </li>
              // <li
              //   key={idx}
              //   className="bg-dark-grey-shade border-grey border-1 flex flex-row px-6 py-4 rounded-md"
              // >
              //   <img className="size-20  rounded-sm" src={item.imgPath} />
              //   <div className="flex flex-col px-6 w-full gap-1">
              //     <p className="body1 font-medium border-b-1 border-primary/20 w-full">
              //       {item.title}
              //     </p>
              //     <p>{item.description}</p>
              //   </div>
              // </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Package;
