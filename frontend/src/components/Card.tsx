import type { TourType } from "../routes/data/tours";
import { FaRegClock } from "react-icons/fa6";
import { FaBahtSign } from "react-icons/fa6";
import Button from "./common/Button";
import ModalPackage from "./modals/ModalPackage";
import { useState } from "react";
import { useNavigate } from "react-router";
import { usePlan } from "../Layout";
import userService from "../services/user-service";

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
  let navigate = useNavigate();
  const { setPlan } = usePlan();

  const bookPackage = (plan: TourType) => {
    const user = userService.getCurrentUser()
    if (user) 
    setPlan(plan);
    navigate("/booking");
    return;
  };

  return (
    <div className="grid grid-rows-[auto_1fr] max-w-[320px] sm:max-w-[400px] rounded-xl overflow-hidden items-center bg-frame-pri shadow-2xl border-1 border-slate-600">
      <div className="w-full overflow-hidden h-[200px] xl:h-[250px]">
        <img
          src={tour.imgCover}
          alt="location image"
          className="object-center object-cover w-full h-full"
        />
      </div>
      <div className="p-2 grid grid-rows-subgrid row-span-3 gap-2 sm:p-6 sm:gap-4">
        <h6 className="text-center">{tour.name}</h6>
        <p className="indent-4">{tour.description}</p>
        <div className="flex flex-row justify-between mt-4">
          <div className="flex flex-col self-end">
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
          <div className="flex flex-col gap-1 items-end">
            <Button
              size="sm"
              className="w-full"
              onClick={() => bookPackage(tour)}
            >
              Booking
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setOpenModal(true)}
            >
              More Detail
            </Button>
          </div>
        </div>
      </div>
      <ModalPackage
        isOpen={openModal}
        onClose={toggleModal}
        tour={tour}
        hasBookingBtn={true}
        bookPackage={() => bookPackage(tour)}
      />
    </div>
  );
};

export default Card;
