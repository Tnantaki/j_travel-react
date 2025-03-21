import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import MemberModal from "./MemberModal";
import bookingService, { MemberType } from "../../services/booking-service";
import { AxiosError } from "axios";

// Mocking
const testMe: MemberType = {
  name: "ณัฐฐานิสร ชาวไร่อ้อย",
  region: "thai",
  age: 25,
  gender: "female",
  phone: "0812345678",
};

const Member = () => {
  const [members, setMember] = useState<MemberType[]>([]);

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

  return (
    <div className="flex flex-col w-full h-full">
      <h4 className="mb-2">Member</h4>
      <div className="flex flex-col w-full rounded-lg border-1 border-lg border-grey p-6 gap-4 h-full">
        <ul className="flex flex-col gap-4 w-full">
          {members.map((member, idx) => (
            <li
              key={idx}
              className="bg-dark-grey-shade border-grey border-1 flex flex-col px-6 py-4 rounded-md"
            >
              <div className="grid grid-cols-3 w-full gap-2">
                {Object.keys(member).map((key) => (
                  <div key={key} className="flex flex-col">
                    <p className="body3 text-light-grey me-1">{key}</p>
                    <p className="text-lg font-normal text-white">
                      {member[key as keyof MemberType]}
                    </p>
                  </div>
                ))}
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
