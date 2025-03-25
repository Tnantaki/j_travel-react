import { useState } from "react";
import tours from "../data/tours";
import Button from "../../components/common/Button";
import { FaRegClock } from "react-icons/fa";
import { FaBahtSign } from "react-icons/fa6";
import ModalPackage from "../../components/ModalPackage";

const ChoosePackage = () => {
  const [selected, setSelected] = useState(tours[0].id);
  const [isOpenPackage, setIsOpenPackage] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full h-full">
      <h4 className="mb-2">Choose Package</h4>
      <div className="flex flex-col w-full rounded-lg border-1 border-slate-400  p-6 gap-4 h-full">
        <form onSubmit={(e) => e.preventDefault()}>
          <ul className="flex flex-col p-2 gap-2">
            {tours.map((tour, idx) => (
              <li key={idx}>
                <ModalPackage
                  isOpen={isOpenPackage}
                  onClose={() => setIsOpenPackage(false)}
                  tour={tour}
                  hasBookingBtn={false}
                />
                <input
                  type="radio"
                  id={tour.id}
                  name="package"
                  value={tour.id}
                  className="hidden peer"
                  checked={selected === tour.id}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label
                  htmlFor={tour.id}
                  className="bg-slate-300 border-slate-400 border-2 flex flex-row px-6 py-4 rounded-md cursor-pointer peer-checked:border-primary"
                >
                  <img className="size-28  rounded-sm" src={tour.imgCover} />
                  <div className="flex flex-col px-6 w-full gap-1">
                    <p className="body1 font-medium border-b-1 border-primary/20 w-full">
                      {tour.name}
                    </p>
                    <p className="indent-4">{tour.description}</p>
                    <div className="flex flex-row justify-between items-end mt-4">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <p className="flex items-center">
                            <FaRegClock />
                            &nbsp;:&nbsp;
                          </p>
                          <p className="body2">{tour.duration}</p>
                        </div>
                        <div className="flex flex-row items-center">
                          <p className="flex items-center">
                            <FaBahtSign />
                            &nbsp;:&nbsp;
                          </p>
                          <p className="body2 font-semibold">
                            {tour.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        rounded="full"
                        variant="outline"
                        className="self-end text-base text-nowrap"
                        onClick={() => setIsOpenPackage(true)}
                      >
                        More Detail
                      </Button>
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default ChoosePackage;
