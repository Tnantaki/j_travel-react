import packages from "../data/packages";

const Package = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <h4 className="mb-2">Choose Package</h4>
      <div className="flex flex-col w-full rounded-lg border-1 border-lg border-grey p-6 gap-4 h-full">
        <ul className="flex flex-col p-2 gap-2">
          {packages.map((item, idx) => (
            <li
              key={idx}
              className="bg-dark-grey-shade border-grey border-1 flex flex-row px-6 py-4 rounded-md"
            >
              <img className="size-20  rounded-sm" src={item.imgPath} />
              <div className="flex flex-col px-6 w-full gap-1">
                <p className="body1 font-medium border-b-1 border-primary/20 w-full">
                  {item.title}
                </p>
                <p>{item.description}</p>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-row gap-3"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Package;
