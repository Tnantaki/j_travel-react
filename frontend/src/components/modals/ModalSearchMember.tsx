import Modal from "./Modal";
import Button from "../common/Button";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { SearchedMemberType, useBooking } from "../../contexts/BookingProvider";
import { FaExclamationCircle } from "react-icons/fa";
import groupService from "../../services/group-service";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

const ModalSearchMember = ({ isOpen, onClose }: Props) => {
  const [members, setMembers] = useState<SearchedMemberType[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<number | undefined>();
  const [error, setError] = useState("");
  const { booking, bookDispatch } = useBooking();

  useEffect(() => {
    if (!searchInput || searchInput.length < 2) {
      setError("");
      setMembers([]);
      return;
    }

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeOutId = window.setTimeout(() => {
      groupService
        .searchMember(searchInput)
        .then(({ data }) => {
          const members = data.map((mem) => ({
            id: mem._id,
            name: mem.username,
            email: mem.email,
          }));
          setMembers(filterMembers(members));
        })
        .catch((err) => {
          console.log(err);
          setError("Error");
          setMembers([]);
        });
    }, 300); //debounce time

    setTypingTimeout(timeOutId);

    return () => clearTimeout(timeOutId);
  }, [searchInput]);

  const renderMemberList = (value: string, label: string) => {
    return (
      <div className="flex flex-col">
        <p className="body3 text-char-pri-tint me-1">{label}</p>
        <p className="text-lg font-normal text-char-pri">{value}</p>
      </div>
    );
  };

  // filter out the member which already added
  const filterMembers = (getMembers: SearchedMemberType[]) => {
    return getMembers.filter((mem) => {
      if (mem.id === booking.leader!.id) {
        return false;
      }
      const memFilter = booking.members.filter((memList) => memList.id === mem.id);
      if (memFilter.length) {
        return false;
      }
      return true;
    });
  };

  const handleAddMember = (member: SearchedMemberType) => {
    bookDispatch({ type: "add_member", member });
    setMembers(members.filter((mem) => mem.id !== member.id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput || searchInput.length < 2) {
      setError("Character must be at least 2.");
      setMembers([]);
      return;
    }

    groupService
      .searchMember(searchInput)
      .then(({ data }) => {
        if (Array.isArray(data) && data.length === 0) {
          setError("Not found");
          return ;
        }

        const members = data.map((mem) => ({
          id: mem._id,
          name: mem.username,
          email: mem.email,
        }));

        setMembers(filterMembers(members));
      })
      .catch((err) => {
        console.log(err);
        setError("Error");
        setMembers([]);
      });
  };

  return (
    <Modal isOpen={isOpen} hasCloseBtn={true} onClose={onClose}>
      <div className="flex flex-col items-center px-10 py-6 gap-2 bg-linear-light-modal">
        <h3 className="text-char-pri">Search Member</h3>
        <form className="w-full lg:w-[800px] p-4 flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex rounded-full text-char-sec items-center body2 overflow-hidden w-full px-4">
            <div className="flex w-full inset-ring-1 inset-ring-frame-ter bg-char-sec text-char-pri items-center focus-within:inset-ring-2 rounded-s-full">
              <IoIosSearch className="px-3 w-15 size-7" />
              <input
                type="text"
                placeholder="Email..."
                className="py-2 w-full focus:border-0 focus:outline-0"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="p-2 px-4 rounded-e-full bg-slate-500 hover:bg-slate-600 hover:cursor-pointer"
            >
              Search
            </button>
          </div>
          {error && (
            <p className="text-info-error flex ps-5 self-start items-center gap-1 text-sm mt-0.5 drop-shadow-lg sm:text-base sm:mt-1">
              <FaExclamationCircle />
              {error}
            </p>
          )}
        </form>
        <ul className="lg:h-[500px] w-full flex flex-col gap-2">
          {members.map((mem) => (
            <li key={mem.id} className="bg-slate-300 border-slate-500 border-1 flex px-6 py-4 rounded-md w-full">
              <div className="grid grid-cols-2 w-full gap-2">
                {renderMemberList(mem.name, "name")}
                {renderMemberList(mem.email, "email")}
              </div>
              <Button rounded="full" size="sm" className="self-center" onClick={() => handleAddMember(mem)}>
                Add
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default ModalSearchMember;
