import InputInfo from "../InputInfo";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Button from "../common/Button";
import { AxiosError } from "axios";
import profileService from "../../services/profile-service";

interface PasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

const ModalPassword = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit, setError } = useForm<PasswordInput>();

  const onSubmit: SubmitHandler<PasswordInput> = async (data) => {
    console.log(data);
    try {
      if (data.newPassword !== data.confirmPassword) {
        throw new Error("Confirm password not match.");
      }
      const res = await profileService.changePassword({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      });
      console.log(res.data)
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        console.log(err.response.data);
        setError("confirmPassword", {
          message: err.response.data as string,
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} hasCloseBtn={true} onClose={onClose}>
      <div className="flex flex-col items-center px-10 py-6 gap-4 bg-linear-light-modal">
        <h3 className="text-char-pri">Change Password</h3>
        <form
          className="w-full p-4 flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputInfo
            type="text"
            label="Old Password"
            {...register("oldPassword")}
          />
          <InputInfo
            type="text"
            label="New Password"
            {...register("newPassword")}
          />
          <InputInfo
            type="text"
            label="Confirm Password"
            {...register("confirmPassword")}
          />
          <Button
            type="submit"
            size="sm"
            rounded="full"
            className="self-center mt-6"
          >
            Change
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalPassword;
