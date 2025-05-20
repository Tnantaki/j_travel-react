import Button from "../../components/common/Button";
import { useState } from "react";
import { MemberInput } from "../../services/booking-service";
import { getAge } from "../../utils/age";
import ModalSearchMember from "../../components/modals/ModalSearchMember";
import MotionButton from "../../components/common/MotionButton";

// Mocking
// const testMe: MemberInput = {
//   name: "ณัฐฐานิสร ชาวไร่อ้อย",
//   birthday: new Date("12-10-2000"),
//   gender: "female",
//   phone: "0812345678",
// };

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Member = ({ nextStep, prevStep }: Props) => {
  // const [members, setMember] = useState<MemberInput[]>([]);
  const [IsOpenMember, setIsOpenMember] = useState<boolean>(false);
  const toggleModal = () => setIsOpenMember(!IsOpenMember);
  // const { group, dispatchGroup } = useGroup();
  const members: MemberInput[]= []

  // const createGroup = async () => {
  //   try {
  //     const res = await groupService.createGroup({
  //       leader: group.leader,
  //       plan: group.plan,
  //       members: [],
  //     });
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  // const { getGroup, cancel } = groupService.getGroup()

  // const requestGroup = async () => {
  //   try {
  //     const res = await getGroup
  //     // get Group API shoud got the detail of leader and members
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {

  // 1. request group if not found, hit post api for create group which have only leader and plan
  // createGroup()
  // 2. request group again and render UI
  // 3. create event handler for adding new members

  // fetchMemberData();
  // }, []);

  const handleChooseMember = () => {
    //
    nextStep();
  };

  const renderMemberList = (value: string, label: string) => {
    return (
      <div className="flex flex-col">
        <p className="body3 text-char-pri-tint me-1">{label}</p>
        <p className="text-lg font-normal text-char-pri">{value}</p>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <h4 className="mb-2">Member</h4>
        <div className="booking-sub-frame">
          <ul className="flex flex-col gap-4 w-full">
            {members.map((member) => (
              <li
                key={member.name}
                className="bg-slate-300 border-slate-500 border-1 flex flex-col px-6 py-4 rounded-md"
              >
                <div className="grid grid-cols-2 w-full gap-2">
                  {renderMemberList(member.name, "name")}
                  {renderMemberList(getAge(member.birthday), "age")}
                  {renderMemberList(member.phone, "phone")}
                  {renderMemberList(member.gender, "gender")}
                </div>
              </li>
            ))}
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
