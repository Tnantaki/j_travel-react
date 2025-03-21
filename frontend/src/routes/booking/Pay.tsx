import packages from "../data/tours";
import datePackages from "../data/datePackages";
import { format } from "date-fns";

const mockMembers = [
  { name: "Renee Matthams", age: 25 },
  { name: "Hattie Zimmerman", age: 18 },
  { name: "Kyron Snyder", age: 28 },
];

const Pay = () => {
  const tour = packages[0];
  const tourDate = datePackages[0];
  const columns = ["No.", "Name", "Age", "Price(Bath)"];

  return (
    <div className="flex flex-col w-full h-full">
      <h4 className="mb-2">Pay</h4>
      <div className="flex flex-col w-full rounded-lg border-1 border-lg border-grey p-6 gap-2 h-full">
        <h4 className="mb-2">Package</h4>
        <div className="flex gap-4">
          <img src={tour.imgCover} className="size-32 rounded-md" />
          <div className="grid grid-cols-2 justify-between">
            <p className="body2 text-light-grey me-1">Package:</p>
            <p className="body1 font-medium text-white">{tour.name}</p>
            <p className="body2 text-light-grey me-1">Departure date:</p>
            <p className="body1 text-white">
              {format(tourDate.start, "dd MMM yyyy")}
            </p>
            <p className="body2 text-light-grey me-1">Reture date:</p>
            <p className="body1 text-white">
              {format(tourDate.end, "dd MMM yyyy")}
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
                <td>{tour.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row items-center">
          <p className="body2 text-light-grey me-4">Total Member:</p>
          <p className="body1 font-medium text-white">
            {mockMembers.length} People
          </p>
        </div>
        <div className="flex flex-row items-center">
          <p className="body2 text-light-grey me-4">Total Price:</p>
          <p className="body1 font-medium text-white">
            {mockMembers.length * tour.price} Bath
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pay;
