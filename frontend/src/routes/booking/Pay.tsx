import { format } from "date-fns";
import MotionButton from "../../components/common/MotionButton";
import { usePlan } from "../../Layout";
import { useBooking } from "../../contexts/BookingProvider";

const mockMembers = [
  { name: "Renee Matthams", age: 25 },
  { name: "Hattie Zimmerman", age: 18 },
  { name: "Kyron Snyder", age: 28 },
];

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Pay = ({ nextStep, prevStep }: Props) => {
  const { plan } = usePlan();
  const { booking } = useBooking();
  const columns = ["No.", "Name", "Age", "Price(Bath)"];

  const handleConfirm = () => {
    nextStep();
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <h4 className="mb-2">Pay</h4>
        <div className="flex flex-col w-full rounded-lg border-1 border-lg border-slate-400 p-6 gap-2 h-full">
          <h4 className="mb-2">Package</h4>
          <div className="flex gap-4">
            <img src={plan!.imgCover} className="size-32 rounded-md" />
            <div className="grid grid-cols-2 justify-between">
              <p className="body2 text-char-pri-tint me-1">Package:</p>
              <p className="body1 font-medium text-char-pri">{plan!.name}</p>
              <p className="body2 text-char-pri-tint me-1">Departure date:</p>
              <p className="body1 text-char-pri">
                {format(booking.startDate!, "dd MMM yyyy")}
              </p>
              <p className="body2 text-char-pri-tint me-1">Reture date:</p>
              <p className="body1 text-char-pri">
                {format(booking.endDate!, "dd MMM yyyy")}
              </p>
            </div>
          </div>
          <h4 className="mb-2">Members</h4>
          <table>
            <thead className="font-medium body1 border-b-1 border-primary/40">
              <tr>
                {columns.map((c, idx) => (
                  <th key={idx} className="py-2">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-b-1 border-primary/40">
              {mockMembers.map((member, idx) => (
                <tr key={idx} className="text-center *:py-2">
                  <td>{idx + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.age}</td>
                  <td>{plan!.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-row items-center">
            <p className="body2 text-char-pri-tint me-4">Total Member:</p>
            <p className="body1 font-medium text-char-pri">
              {mockMembers.length} People
            </p>
          </div>
          <div className="flex flex-row items-center">
            <p className="body2 text-char-pri-tint me-4">Total Price:</p>
            <p className="body1 font-medium text-char-pri">
              {mockMembers.length * plan!.price} Bath
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <MotionButton rounded="full" onClick={prevStep}>
          Previous
        </MotionButton>
        <MotionButton rounded="full" onClick={handleConfirm}>
          Next
        </MotionButton>
      </div>
    </>
  );
};

export default Pay;
