import { FaBahtSign, FaRegClock } from "react-icons/fa6";
import Modal from "./Modal";
import { TourType } from "../routes/data/tours";
import Button from "./common/Button";
import { AiFillSchedule } from "react-icons/ai";
import { useNavigate } from "react-router";
import ModalPhotoList from "./ModalPhotoList";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  tour: TourType;
  hasBookingBtn: boolean;
}

const ModalPackage = ({ isOpen, onClose, tour, hasBookingBtn }: Props) => {
  let navigate = useNavigate();

  const bookPackage = () => {
    navigate("/booking");
    return;
  };

  return (
    <Modal isOpen={isOpen} hasCloseBtn={true} onClose={onClose}>
      <div className="flex flex-col items-center p-10 gap-4 text-center bg-linear-light w-[1000px]">
        <div className="flex flex-row rounded-md overflow-hidden gap-8 bg-frame-sec-tint border-slate-400 border-1">
          <div className="overflow-hidden size-[300px] shrink-0">
            <img
              src={tour.imgCover}
              alt="Image cover"
              className="object-center object-cover size-[300px]"
            />
          </div>
          <div className="flex flex-col text-char-pri items-start text-start py-4 pe-6 justify-between shrink">
            <div className="grid gap-4">
              <h4>{tour.name}</h4>
              <p className="body2 text-char-pri-tint indent-4">
                {tour.description}
              </p>
            </div>
            <div className="flex flex-row w-full justify-between mt-4">
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
                <div className="flex flex-row items-center border-red-400 border-1 rounded-sm px-2 py-1 bg-red-200 text-char-pri-tint">
                  <p className="body2 font-medium flex items-center">
                    For private guide +{tour.privateGuide.toLocaleString()} <FaBahtSign className="body2" /> per group.
                  </p>
                </div>
              </div>
              <div className="flex items-end">
                {hasBookingBtn && (
                  <Button variant="primary" size="md" onClick={bookPackage}>
                    Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-items-start text-start bg-frame-sec-tint border-slate-400 border-1 p-4 rounded-md">
            <div className="flex items-center text-char-pri mb-2">
              <AiFillSchedule className="size-6" />
              &nbsp;
              <h6>Schedule</h6>
            </div>
            <ul className="flex flex-col items-start gap-6">
              {tour.itinerary.map((item, idx) => (
                <li key={idx} className="flex flex-col text-char-pri-tint gap-2">
                  <p className="text-lg">
                    <span className="font-langar text-xl text-primary">
                      Day {item.day} -{" "}
                    </span>
                    {item.title}
                  </p>
                  <ul className="list-disc ps-4 flex flex-col gap-1">
                    {item.events.map((event, idx) => (
                      <li key={idx}>{event}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex flex-col justify-evenly w-[300px]">
            {tour.photos.map((photo, idx) => (
              <ModalPhotoList key={idx} img={photo.img} name={photo.name} />
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPackage;
