import Button from "../../components/common/Button";
import { useState } from "react";
import ModalSearchMember from "../../components/modals/ModalSearchMember";
import MotionButton from "../../components/common/MotionButton";
import { SearchedMemberType, useBooking } from "../../contexts/BookingProvider";
import groupService, { ReqGroupType } from "../../services/group-service";
import ModalConfirmGroup from "../../components/modals/ModalConfirmGroup";
import { RxCross2 } from "react-icons/rx";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Member = ({ nextStep, prevStep }: Props) => {
  const { booking, bookDispatch } = useBooking();
  const [IsOpenMember, setIsOpenMember] = useState<boolean>(false);
  const [IsOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const toggleModal = () => setIsOpenMember(!IsOpenMember);

  const handleChooseMember = async () => {
    const { getGroup } = groupService.getGroup();

    const group: ReqGroupType = {
      plan: booking.planId,
      members: booking.members.map((m) => m.id),
    };

    try {
      // Check there is exist group
      const { data: exisedGroup } = await getGroup;
      const leaderGroups = exisedGroup.leaderGroups;

      if (
        leaderGroups.length &&
        leaderGroups[leaderGroups.length - 1]._id === booking.groupId
      ) {
        await groupService.updateGroup(group, booking.groupId);
        nextStep();
      } else {
        const { data } = await groupService.createGroup(group);

        if (data._id) {
          bookDispatch({ type: "add_groupId", groupId: data._id });
          nextStep();
        }
      }
    } catch (error) {
      console.log(error);
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

  const renderMemberList = (member: SearchedMemberType, isLeader: boolean) => {
    return (
      <li
        key={member.id}
        className="bg-slate-300 border-slate-500 border-1 flex flex-col px-6 py-4 rounded-md relative"
      >
        <div className="grid grid-cols-2 w-full gap-2 ">
          {renderMemberParagraph(member.name, "name")}
          {renderMemberParagraph(member.email, "email")}
          {!isLeader && (
            <button
              className="absolute right-2 top-0 translate-y-1/2 bg-char-ter rounded-full hover:bg-info-error hover:cursor-pointer"
              onClick={() =>
                bookDispatch({ type: "del_member", memberId: member.id })
              }
            >
              <RxCross2 className="size-10 p-1 text-blue-50" />
            </button>
          )}
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
            {renderMemberList(booking.leader!, true)}
            {booking.members.map((member) => renderMemberList(member, false))}
            <Button
              rounded="full"
              size="sm"
              className="self-center"
              onClick={toggleModal}
            >
              + Member
            </Button>
            <ModalSearchMember
              isOpen={IsOpenMember}
              onClose={() => setIsOpenMember(!IsOpenMember)}
            />
            <ModalConfirmGroup
              message="Are you sure to create group."
              isOpen={IsOpenConfirm}
              onYes={handleChooseMember}
              onNo={() => setIsOpenConfirm(false)}
            />
          </ul>
        </div>
      </div>
      <div className="flex justify-between">
        <MotionButton rounded="full" onClick={prevStep}>
          Previous
        </MotionButton>
        <MotionButton rounded="full" onClick={() => setIsOpenConfirm(true)}>
          Next
        </MotionButton>
      </div>
    </>
  );
};

export default Member;
