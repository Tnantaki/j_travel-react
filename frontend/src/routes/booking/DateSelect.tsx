import { useState } from "react";
import { format } from "date-fns";
import Calendar from "../../components/Calendar";
import { FaExclamation } from "react-icons/fa";
import MotionButton from "../../components/common/MotionButton";
import { usePlan } from "../../Layout";
import { useBooking } from "../../contexts/BookingProvider";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const DateSelect = ({ nextStep, prevStep }: Props) => {
  const { plan } = usePlan();
  const duration = plan!.duration;
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { bookDispatch } = useBooking();

  const onDateChange = (date: Date) => {
    setStartDate(date);
    const currentDate = new Date(date);
    currentDate.setDate(date.getDate() + duration - 1);
    setEndDate(currentDate);
  };

  const handleSelectDate = () => {
    if (startDate && endDate) {
      bookDispatch({ type: "select_date", startDate, endDate });
    }
    nextStep();
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <h4 className="mb-2">Select Date</h4>
        <div className="booking-sub-frame lg:flex-row">
          <form className="shrink-0" onSubmit={(e) => e.preventDefault()}>
            <Calendar onDateChange={onDateChange} duration={duration} />
          </form>
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 w-fit gap-2">
              <p className="body3 text-char-pri-tint me-1">Durations :</p>
              <p className="body2 text-char-pri">{duration} Days</p>
              <p className="body3 text-char-pri-tint me-1">Departure date :</p>
              <p className="body2 text-char-pri">
                {startDate && format(startDate, "dd MMM yyyy")}
              </p>
              <p className="body3 text-char-pri-tint me-1">Reture date :</p>
              <p className="body2 text-char-pri">
                {endDate && format(endDate, "dd MMM yyyy")}
              </p>
            </div>
            <div className="rounded-md border-1 border-gray-600 bg-frame-sec-tint p-4 flex text-error xs:body2 gap-2">
              <FaExclamation className="size-5" />
              <p>
                The schedule and appointment details for your travel trip will
                be communicated to you at a later time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <MotionButton rounded="full" onClick={prevStep}>
          Previous
        </MotionButton>
        <MotionButton rounded="full" onClick={handleSelectDate}>
          Next
        </MotionButton>
      </div>
    </>
  );
};

export default DateSelect;
