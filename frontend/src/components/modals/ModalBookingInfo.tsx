import { format } from "date-fns";
import Modal from "./Modal";
import bookingService, { Booking } from "../../services/booking-service";
import { getAge } from "../../utils/age";
import groupService, { MemberType } from "../../services/group-service";
import placeHolder from "@img/background/placeholder-image.jpg";
import { useEffect, useState } from "react";
import { AxiosError, isAxiosError } from "axios";
import Button from "../common/Button";
import Status from "../common/Status";

interface Props {
  isOpen: boolean;
  bookingId: string;
  onClose?: () => void;
}

const ModalBookingInfo = ({ isOpen, onClose, bookingId }: Props) => {
  const [book, setBook] = useState<Booking>();
  const [totalMember, setTotalMember] = useState(0);

  const columns = ["No.", "Name", "Age", "Price(Bath)"];
  let orderMember = 0;

  useEffect(() => {
    const { getBooking, cancel } = bookingService.getOne();

    const reqGroup = async () => {
      try {
        const { data } = await getBooking(bookingId);

        setBook(data);
        setTotalMember(data.group.members.length + 1); // + 1(leader)
      } catch (error: any | AxiosError) {
        if (isAxiosError(error)) {
          if (error.response) {
            console.log(error.response.data);
          }
        } else {
          console.log(error.response.data);
        }
      }
    };
    reqGroup();
    return () => {
      cancel(); // cancel request in case user navigate away before get response
    };
  }, [book]);

  const handleBookingPay = () => {
    try {
      console.log("book id:", bookingId);
      bookingService.pay(bookingId);
    } catch (error: any | AxiosError) {
      if (isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
        }
      } else {
        console.log(error.response.data);
      }
    }
  };

  const handleBookingCancel = () => {
    try {
      console.log("book id:", bookingId);
      bookingService.cancel(bookingId);
    } catch (error: any | AxiosError) {
      if (isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
        }
      } else {
        console.log(error.response.data);
      }
    }
  };

  const renderMemberTableRow = (member: MemberType, price: number) => {
    orderMember += 1;

    return (
      <tr key={member.name} className="text-center *:py-2">
        <td>{orderMember}</td>
        <td>{member.name}</td>
        <td>{getAge(member.birthday)}</td>
        <td>{price}</td>
      </tr>
    );
  };

  return (
    <Modal isOpen={isOpen} hasCloseBtn={true} onClose={onClose}>
      <div className="flex flex-col rounded-lg bg-frame-sec-tint border-slate-300 border-1 p-1 shadow-lg text-char-pri w-full sm:p-8 ms:rounded-2xl gap-6 h-full max-w-[1200px] sec-padding">
        <div className="flex flex-col w-full h-full">
          <h4 className="mb-2">Booking Information</h4>
          {book ? (
            <div className="flex flex-col w-full rounded-lg border-1 border-lg border-slate-400 p-6 gap-2 h-full">
              <h4 className="mb-2">Package</h4>
              <div className="flex gap-4 lg:gap-12 flex-start">
                <img
                  src={
                    book.plan.images.length
                      ? book.plan.images[0].imageUrl
                      : placeHolder
                  }
                  className="size-32 rounded-md"
                />
                <div className="grid grid-cols-2">
                  <p className="body2 text-char-pri-tint me-1">Package:</p>
                  <p className="body1 font-medium text-char-pri">
                    {book.plan.title}
                  </p>
                  <p className="body2 text-char-pri-tint me-1">
                    Departure date:
                  </p>
                  <p className="body1 text-char-pri">
                    {format(book.firstDay, "dd MMM yyyy")}
                  </p>
                  <p className="body2 text-char-pri-tint me-1">Reture date:</p>
                  <p className="body1 text-char-pri">
                    {format(book.lastDay, "dd MMM yyyy")}
                  </p>
                  <p className="body2 text-char-pri-tint me-1">status:</p>
                  <div className="justify-items-start">
                    <Status status={book.status} />
                  </div>
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
                  {renderMemberTableRow(
                    groupService.transformMember(book.group.leader),
                    book.plan.price
                  )}
                  {book.group.members.map((member) =>
                    renderMemberTableRow(
                      groupService.transformMember(member),
                      book.plan.price
                    )
                  )}
                </tbody>
              </table>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    <p className="body2 text-char-pri-tint me-4">
                      Total Member:
                    </p>
                    <p className="body1 font-medium text-char-pri">
                      {totalMember} People
                    </p>
                  </div>
                  <div className="flex flex-row items-center">
                    <p className="body2 text-char-pri-tint me-4">
                      Total Price:
                    </p>
                    <p className="body1 font-medium text-char-pri">
                      {totalMember * book.plan.price} Bath
                    </p>
                  </div>
                </div>
                {book.paymentStatus === "unpaid" && (
                  <div className="flex gap-4">
                    <Button
                      size="sm"
                      className="self-end"
                      onClick={handleBookingPay}
                    >
                      Pay
                    </Button>
                    <Button
                      size="sm"
                      className="self-end bg-red-400 border-red-400"
                      onClick={handleBookingCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalBookingInfo;
