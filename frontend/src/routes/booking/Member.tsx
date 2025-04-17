import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import MemberModal from "../../components/modals/MemberModal";
import bookingService, { MemberInput } from "../../services/booking-service";
import { AxiosError } from "axios";
import { getAge } from "../../utils/age";

// Mocking
const testMe: MemberInput = {
  name: "ณัฐฐานิสร ชาวไร่อ้อย",
  birthday: new Date("12-10-2000"),
  gender: "female",
  phone: "0812345678",
};

const Member = () => {
  const [members, setMember] = useState<MemberInput[]>([]);

  const fetchMemberData = async () => {
    try {
      const request = await bookingService.getMembers();

      setMember(request.data);
    } catch (error: any | AxiosError) {
      console.log(error);
      setMember([testMe]);
    }
  };

  useEffect(() => {
    fetchMemberData();
  }, []);

  const [IsOpenMember, setIsOpenMember] = useState<boolean>(false);
  const toggleModal = () => setIsOpenMember(!IsOpenMember);

  const renderMemberList = (value: string, label: string) => {
    return (
      <div className="flex flex-col">
        <p className="body3 text-char-pri-tint me-1">{label}</p>
        <p className="text-lg font-normal text-char-pri">{value}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h4 className="mb-2">Member</h4>
      <div className="booking-sub-frame">
        <ul className="flex flex-col gap-4 w-full">
          {members.map((member, idx) => (
            <li
              key={idx}
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
          <MemberModal
            isOpen={IsOpenMember}
            onClose={() => setIsOpenMember(!IsOpenMember)}
            fetchMemberData={fetchMemberData}
          />
        </ul>
      </div>
    </div>
  );
};

export default Member;
