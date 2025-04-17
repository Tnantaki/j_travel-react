import InputInfo from "../InputInfo";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Button from "../common/Button";
import GenderInput from "../GenderInput";
import bookingService, { MemberInput } from "../../services/booking-service";
import { AxiosError } from "axios";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  fetchMemberData: () => void;
}

const MemberModal = ({ isOpen, onClose, fetchMemberData }: Props) => {
  const { register, handleSubmit } = useForm<MemberInput>();

  const onSubmit: SubmitHandler<MemberInput> = async (data) => {
    console.log(data);
    try {
      await bookingService.addMember(data);
      fetchMemberData();
    } catch (error: any | AxiosError) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} hasCloseBtn={true} onClose={onClose}>
      <div className="flex flex-col items-center px-10 py-6 gap-4 bg-linear-light-modal">
        <h3 className="text-char-pri">Add Member</h3>
        <form
          className="w-full lg:w-[800px] p-4 flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <InputInfo
              type="text"
              label="Name"
              {...register("name")}
              className="col-span-1 sm:col-span-2"
            />
            <InputInfo type="date" label="Birthday" {...register("birthday")} />
            <InputInfo type="text" label="Phone" {...register("phone")} />
            <GenderInput {...register("gender")} />
          </div>
          <Button
            type="submit"
            size="sm"
            rounded="full"
            className="self-center mt-6"
          >
            Add +
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default MemberModal;
