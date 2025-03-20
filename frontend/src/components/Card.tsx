import type { TourType } from "../routes/data/tours";
import { FaRegClock } from "react-icons/fa6";
import { FaBahtSign } from "react-icons/fa6";
import Button from "./common/Button";
import ModalPackage from "./ModalPackage";
import { useState } from "react";

interface Props {
  tour: TourType;
}

<div className="grid grid-cols-3">
  <div className="card grid">
    <div className="max-h-[250px]">
      <img src="" alt="" />
    </div>
    <div className="detail p-3 grid">
      <h4>Title</h4>
      <p>description</p>
      <p>price</p>
    </div>
  </div>
</div>;

const Card = ({ tour }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const toggleModal = () => setOpenModal(!openModal);

  return (
    <div className="grid grid-rows-[auto_1fr] max-w-[400px] rounded-xl overflow-hidden items-center bg-dark-secondary">
      <div className="w-full overflow-hidden max-h-[250px]">
        <img
          src={tour.imgCover}
          alt="location image"
          className="object-center"
        />
      </div>
      <div className="p-3 grid grid-rows-subgrid row-span-3 gap-2 sm:p-6 sm:gap-4">
        <h4 className="text-center">{tour.name}</h4>
        <p className="indent-4">{tour.description}</p>
        <div className="flex flex-row justify-between mt-4">
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
              <p className="body1 font-semibold">
                {tour.price.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-end">
            <Button variant="outline" size="sm" onClick={toggleModal}>
              More Detail
            </Button>
          </div>
        </div>
      </div>
      <ModalPackage isOpen={openModal} onClose={toggleModal} tour={tour} />
    </div>
  );
};

export default Card;
