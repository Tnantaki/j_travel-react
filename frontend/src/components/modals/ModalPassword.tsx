import InputInfo from "../InputInfo";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Button from "../common/Button";
import { AxiosError, isAxiosError } from "axios";
import userService from "../../services/user-service";
import { FaExclamationCircle } from "react-icons/fa";

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
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordInput>();

  const onSubmit: SubmitHandler<PasswordInput> = async (data) => {
    console.log(data);
    try {
      if (data.newPassword !== data.confirmPassword) {
        throw new Error("Confirm password not match.");
      }
      const res = await userService.changePassword({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      });
      console.log(res.data);
    } catch (error: any | AxiosError) {
      if (isAxiosError(error)) {
        if (error.response) {
          setError("confirmPassword", {
            message: error.response.data,
          });
        }
      } else {
        setError("confirmPassword", {
          message: error.message,
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
            type="password"
            label="Old Password"
            {...register("oldPassword")}
          />
          <InputInfo
            type="password"
            label="New Password"
            {...register("newPassword")}
          />
          <InputInfo
            type="password"
            label="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-info-error flex items-center gap-1 text-sm mt-0.5 drop-shadow-lg sm:text-base sm:mt-1 self-start">
              <FaExclamationCircle />
              {errors.confirmPassword.message}
            </p>
          )}
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
