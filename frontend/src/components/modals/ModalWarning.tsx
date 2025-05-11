import { PiWarningFill } from "react-icons/pi";
import Modal from "./Modal";
import Button from "../common/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalWarning = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} hasCloseBtn={false}>
      <div className="flex flex-col items-center p-10 gap-4 text-center bg-linear-light-modal">
        <h3 className="text-info-warning">WARNING</h3>
        <p className="body2 text-char-pri w-[260px]">
          You don't have profile information yet, Please fill out the form.
        </p>
        <div className="text-info-warning pt-4 pb-8">
          <PiWarningFill className="size-18 drop-shadow-xl" />
        </div>
        <Button
          type="button"
          size="sm"
          variant="success"
          rounded="full"
          className="shadow-info-warning/25 shadow-lg bg-info-warning border-info-warning"
          onClick={onClose}
        >
          Create Profile
        </Button>
      </div>
    </Modal>
  );
};

export default ModalWarning;
