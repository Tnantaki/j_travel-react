import type { TourType } from "../routes/data/tours";
import { FaRegClock } from "react-icons/fa6";
import { FaBahtSign } from "react-icons/fa6";
import Button from "./common/Button";

interface Props {
  tour: TourType;
}

const Card = ({ tour }: Props) => {
  return (
    <div className="flex flex-col max-w-[400px] rounded-xl overflow-hidden items-center bg-dark-secondary">
      <div className="aspect-4/3 w-full overflow-hidden max-h-[250px]">
        <img
          src={tour.imgCover}
          alt="location image"
          className="object-center"
        />
      </div>
      <div className="p-3 grid gap-2 sm:p-6 sm:gap-4">
        <h4 className="text-center">{tour.name}</h4>
        <p>{tour.description}</p>
        <div className="flex flex-row justify-between">
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
            <p className="body1 font-semibold text-primary">{tour.price.toLocaleString()}</p>
          </div>
          </div>
          <div className="flex items-end">
            <Button variant="outline" size="sm">More Detail</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
