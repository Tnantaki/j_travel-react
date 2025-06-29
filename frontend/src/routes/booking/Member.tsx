import Button from "../../components/common/Button";
import { useState } from "react";
// import { getAge } from "../../utils/age";
import ModalSearchMember from "../../components/modals/ModalSearchMember";
import MotionButton from "../../components/common/MotionButton";
import { SearchedMemberType, useBooking } from "../../contexts/BookingProvider";
import groupService, { GroupType } from "../../services/group-service";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Member = ({ nextStep, prevStep }: Props) => {
  const { booking, bookDispatch } = useBooking();
  const [IsOpenMember, setIsOpenMember] = useState<boolean>(false);
  const toggleModal = () => setIsOpenMember(!IsOpenMember);

  const handleChooseMember = async () => {
    const group: GroupType = {
      plan: booking.planId,
      members: booking.members.map((m) => m.id),
    };

    try {
      const res = await groupService.createGroup(group);
      if (res.data._id) {
        bookDispatch({ type: "add_groupId", groupId: res.data._id });
        nextStep();
      }
    } catch (error) {
      console.log(error)  
    }
  };

  const renderMemberParagraph = (value: string, label: string) => {
    return (
      <div className="flex flex-col">
        <p className="body3 text-char-pri-tint me-1">{label}</p>
        <p className="text-lg font-normal text-char-pri">{value}</p>
      </div>
    );
  };

  const renderMemberList = (member: SearchedMemberType) => {
    return (
      <li
        key={member.id}
        className="bg-slate-300 border-slate-500 border-1 flex flex-col px-6 py-4 rounded-md"
      >
        <div className="grid grid-cols-2 w-full gap-2">
          {renderMemberParagraph(member.name, "name")}
          {renderMemberParagraph(member.email, "email")}
        </div>
      </li>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <h4 className="mb-2">Member</h4>
        <div className="booking-sub-frame">
          <ul className="flex flex-col gap-4 w-full">
            {renderMemberList(booking.leader!)}
            {booking.members.map((member) => renderMemberList(member))}
            <Button
              rounded="full"
              size="sm"
              className="self-center"
              onClick={toggleModal}
            >
              + Member
            </Button>
            {/* <MemberModal
            isOpen={IsOpenMember}
            onClose={() => setIsOpenMember(!IsOpenMember)}
            fetchMemberData={fetchMemberData}
          /> */}
            <ModalSearchMember
              isOpen={IsOpenMember}
              onClose={() => setIsOpenMember(!IsOpenMember)}
            />
          </ul>
        </div>
      </div>
      <div className="flex justify-between">
        <MotionButton rounded="full" onClick={prevStep}>
          Previous
        </MotionButton>
        <MotionButton rounded="full" onClick={handleChooseMember}>
          Next
        </MotionButton>
      </div>
    </>
  );
};

export default Member;
