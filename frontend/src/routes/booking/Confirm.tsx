import { format } from "date-fns";
import MotionButton from "../../components/common/MotionButton";
import { usePlan } from "../../Layout";
import { useBooking } from "../../contexts/BookingProvider";
import { getAge } from "../../utils/age";
import bookingService from "../../services/booking-service";
import { useEffect, useState } from "react";
import ModalSuccess from "../../components/modals/ModalSuccess";
import placeHolder from "@img/background/placeholder-image.jpg";
import groupService, { MemberType } from "../../services/group-service";
import { AxiosError, isAxiosError } from "axios";
import ModalCancelPlan from "../../components/modals/ModalCancelPlan";
import { useNavigate } from "react-router";

interface Props {
  prevStep: () => void;
}

const Confirm = ({ prevStep }: Props) => {
  const [isConfirmSuccess, setIsConfirmSuccess] = useState<boolean>(false);
  const [isConfirmCancel, setIsConfirmCancel] = useState<boolean>(false);
  const [leader, setLeader] = useState<MemberType>();
  const [members, setMembers] = useState<MemberType[]>();
  const navigate = useNavigate();

  const { plan } = usePlan();
  const { booking, bookDispatch } = useBooking();
  const columns = ["No.", "Name", "Age", "Price(Bath)"];
  const totalMember = booking.members.length + 1; // 1 is leader
  let orderMember = 0;

  useEffect(() => {
    const { getGroup, cancel } = groupService.getGroup();

    const reqGroup = async () => {
      try {
        const { data } = await getGroup;

        if (data.leaderGroups.length) {
          const group = data.leaderGroups[data.leaderGroups.length - 1];

          setLeader(groupService.transformMember(group.leader));
          setMembers(groupService.transformMember(group.members));
        }
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
  }, []);

  const handleConfirm = async () => {
    const bookingData = {
      plan: booking.planId,
      group: booking.groupId,
      firstDay: booking.startDate!.toISOString(),
      lastDay: booking.endDate!.toISOString(),
    };
    try {
      const res = await bookingService.createBooking(bookingData);
      if (res.status >= 200 && res.status < 300) {
        console.log("booking success");

        // clear front-end cache
        bookDispatch({type: 'clear'})

        setIsConfirmSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelPlan = async () => {
    try {
      const res = await groupService.deleteGroup(booking.groupId);
      if (res.status >= 200 && res.status < 300) {
        setIsConfirmCancel(false);

        // clear front-end cache
        bookDispatch({type: 'clear'})

        // refresh the page
        navigate(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderMemberTableRow = (member: MemberType) => {
    orderMember += 1;

    return (
      <tr key={member.id} className="text-center *:py-2">
        <td>{orderMember}</td>
        <td>{member.name}</td>
        <td>{getAge(member.birthday)}</td>
        <td>{plan!.price}</td>
      </tr>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <h4 className="mb-2">Booking Information</h4>
        <div className="flex flex-col w-full rounded-lg border-1 border-lg border-slate-400 p-6 gap-2 h-full">
          <h4 className="mb-2">Package</h4>
          <div className="flex gap-4">
            <img
              src={plan!.images.length ? plan!.images[0].imageUrl : placeHolder}
              className="size-32 rounded-md"
            />
            <div className="grid grid-cols-2 justify-between">
              <p className="body2 text-char-pri-tint me-1">Package:</p>
              <p className="body1 font-medium text-char-pri">{plan!.title}</p>
              <p className="body2 text-char-pri-tint me-1">Departure date:</p>
              <p className="body1 text-char-pri">
                {booking.startDate && format(booking.startDate, "dd MMM yyyy")}
              </p>
              <p className="body2 text-char-pri-tint me-1">Reture date:</p>
              <p className="body1 text-char-pri">
                {booking.startDate && format(booking.endDate!, "dd MMM yyyy")}
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
              {leader && renderMemberTableRow(leader)}
              {members && members.map((member) => renderMemberTableRow(member))}
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
              {totalMember * plan!.price} Bath
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <MotionButton rounded="full" onClick={prevStep}>
          Previous
        </MotionButton>
        <div className="flex gap-4">
          <MotionButton
            rounded="full"
            className="bg-red-500 border-red-500 shadow-red-700/50"
            onClick={() => setIsConfirmCancel(true)}
          >
            Cancel
          </MotionButton>
          <MotionButton rounded="full" onClick={handleConfirm}>
            Confirm
          </MotionButton>
        </div>
      </div>
      <ModalCancelPlan
        isOpen={isConfirmCancel}
        onDelete={handleCancelPlan}
        onClose={() => setIsConfirmCancel(false)}
      />
      <ModalSuccess
        message={`You have booking the plan.
          Wait for admin to contact.`}
        isOpen={isConfirmSuccess}
        to="/account/book"
      />
    </>
  );
};

export default Confirm;
