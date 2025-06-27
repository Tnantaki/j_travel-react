import { format } from "date-fns";
import Modal from "./Modal";
import { MemberType } from "../../contexts/BookingProvider";
import { BookingType } from "../../services/booking-service";
// import { getAge } from "../../utils/age";

interface Props {
  isOpen: boolean;
  book: BookingType;
  onClose?: () => void;
}

const ModalBookingInfo = ({ isOpen, onClose, book }: Props) => {
  const columns = ["No.", "Name", "Age", "Price(Bath)"];
  const totalMember = book.group.members.length + 1; // 1 is leader
  let orderMember = 0;

  const renderMemberTableRow = (member: MemberType) => {
    orderMember += 1;

    return (
      <tr key={member.id} className="text-center *:py-2">
        <td>{orderMember}</td>
        <td>{member.name}</td>
        {/* <td>{getAge(member.birthday)}</td> */}
        <td>{book.plan.price}</td>
      </tr>
    );
  };

  return (
    <Modal isOpen={isOpen} hasCloseBtn={true} onClose={onClose}>
      <div className="flex flex-col rounded-lg bg-frame-sec-tint border-slate-300 border-1 p-1 shadow-lg text-char-pri w-full sm:p-8 ms:rounded-2xl gap-6 h-full max-w-[1200px] sec-padding">
        <div className="flex flex-col w-full h-full">
          <h4 className="mb-2">Booking Information</h4>
          <div className="flex flex-col w-full rounded-lg border-1 border-lg border-slate-400 p-6 gap-2 h-full">
            <h4 className="mb-2">Package</h4>
            <div className="flex gap-4 lg:gap-12">
              <img src={book.plan.image} className="size-32 rounded-md" />
              <div className="grid grid-cols-2 justify-between">
                <p className="body2 text-char-pri-tint me-1">Package:</p>
                <p className="body1 font-medium text-char-pri">
                  {book.plan.title}
                </p>
                <p className="body2 text-char-pri-tint me-1">Departure date:</p>
                <p className="body1 text-char-pri">
                  {format(book.firstDay, "dd MMM yyyy")}
                </p>
                <p className="body2 text-char-pri-tint me-1">Reture date:</p>
                <p className="body1 text-char-pri">
                  {format(book.lastDay, "dd MMM yyyy")}
                </p>
              </div>
            </div>
            <h4 className="mb-2">Members</h4>
            <table className="sm:w-[480px] md:w-[600px] lg:w-[800px] xl:w-[1000px]">
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
                {/* {renderMemberTableRow(book.group.leader)} */}
                {book.group.members.map((member) =>
                  renderMemberTableRow(member)
                )}
              </tbody>
            </table>
            <div className="flex flex-row items-center">
              <p className="body2 text-char-pri-tint me-4">Total Member:</p>
              <p className="body1 font-medium text-char-pri">
                {totalMember} People
              </p>
            </div>
            <div className="flex flex-row items-center">
              <p className="body2 text-char-pri-tint me-4">Total Price:</p>
              <p className="body1 font-medium text-char-pri">
                {totalMember * book.plan.price} Bath
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBookingInfo;
