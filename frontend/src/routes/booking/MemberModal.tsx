import InputInfo from "../../components/InputInfo";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import Button from "../../components/common/Button";
import GenderInput from "../../components/GenderInput";
import bookingService, { MemberType } from "../../services/booking-service";
import { AxiosError } from "axios";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  fetchMemberData: () => void;
}

const MemberModal = ({ isOpen, onClose, fetchMemberData }: Props) => {
  const { register, handleSubmit } = useForm<MemberType>();

  const onSubmit: SubmitHandler<MemberType> = async (data) => {
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
      <div className="flex flex-col items-center px-10 py-6 gap-4 bg-linear-to-br from-frame-pri to-dark-grey">
        <h3 className="text-char-pri">Add Member</h3>
        <form
          className="w-[800px] p-4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputInfo type="text" label="Name" {...register("name")} />
          <div className="grid grid-cols-2 gap-6">
            <InputInfo type="text" label="Region" {...register("region")} />
            <InputInfo type="number" label="Age" {...register("age")} />
          </div>
          <div className="grid grid-cols-2 gap-6">
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
