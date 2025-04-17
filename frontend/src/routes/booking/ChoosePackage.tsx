import { useState } from "react";
import tours from "../data/tours";
import Button from "../../components/common/Button";
import { FaRegClock } from "react-icons/fa";
import { FaBahtSign } from "react-icons/fa6";
import ModalPackage from "../../components/modals/ModalPackage";
import LinkButton from "../../components/LinkButton";

const ChoosePackage = () => {
  // const [selected, setSelected] = useState(tours[0].id);
  const [isOpenPackage, setIsOpenPackage] = useState<boolean>(false);
  const tour = tours[0];

  return (
    <div className="flex flex-col w-full h-full">
      <h4 className="mb-2">Choose Package</h4>
      <div className="booking-sub-frame">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2"
        >
          <LinkButton to="/packages" className="self-start" size="sm">
            Change Package
          </LinkButton>
          <div>
            <ModalPackage
              isOpen={isOpenPackage}
              onClose={() => setIsOpenPackage(false)}
              tour={tour}
              hasBookingBtn={false}
            />
            <div className="bg-slate-300 border-slate-400 border-2 flex flex-col md:flex-row px-6 py-4 rounded-md">
              <div className="overflow-hidden max-w-[300px] md:max-w-[260px] lg:max-w-[320px] shrink-0 self-center lg:self-auto">
                <img
                  src={tour.imgCover}
                  alt="Image cover"
                  className="object-center object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col px-6 w-full gap-1 justify-between">
                <div className="flex flex-col gap-2">
                  <p className="body1 font-medium border-b-1 border-primary/20 w-full">
                    {tour.name}
                  </p>
                  <p className="indent-4">{tour.description}</p>
                </div>
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
            </div>
          </div>
          {/* <ul className="flex flex-col p-2 gap-2">
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
          </ul> */}
          <div className="flex flex-col">
            <h5>Select Tour Option</h5>
            <div className="flex p-2 gap-2 body1 font-medium">
              <div>
                <input
                  type="radio"
                  name="tourType"
                  id="tourGroup"
                  value="tourGroup"
                  className="hidden peer"
                  defaultChecked
                />
                <label
                  htmlFor="tourGroup"
                  className="py-2 px-4 bg-frame-pri rounded-md border-frame-pri peer-checked:border-char-pri peer-checked:bg-primary peer-checked:text-char-sec"
                >
                  Tour Group
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="tourType"
                  id="privateGroup"
                  value="privateGroup"
                  className="hidden peer"
                />
                <label
                  htmlFor="privateGroup"
                  className="py-2 px-4 bg-frame-pri rounded-md border-frame-pri peer-checked:border-char-pri peer-checked:bg-primary peer-checked:text-char-sec"
                >
                  Private Group
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChoosePackage;
