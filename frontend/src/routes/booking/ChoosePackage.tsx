import { useState } from "react";
import tours from "../data/tours";
import Button from "../../components/common/Button";
import { FaRegClock } from "react-icons/fa";
import { FaBahtSign } from "react-icons/fa6";
import ModalPackage from "../../components/modals/ModalPackage";
import LinkButton from "../../components/common/LinkButton";
import ButtonRadio from "../../components/common/ButtonRadio";

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
          <div className="flex flex-col">
            <h5>Select Tour Option</h5>
            <div className="flex p-2 gap-2 body1 font-medium">
              <ButtonRadio name="tourType" id="tourGroup" label="Tour Group" />
              <ButtonRadio
                name="tourType"
                id="privateGroup"
                label="Private Group"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChoosePackage;
