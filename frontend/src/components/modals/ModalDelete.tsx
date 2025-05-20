import { PiWarningCircleFill } from "react-icons/pi";
import Modal from "./Modal";
import Button from "../common/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ModalDelete = ({ isOpen, onClose, onDelete }: Props) => {
  return (
    <Modal isOpen={isOpen} hasCloseBtn={false}>
      <div className="flex flex-col items-center p-10 gap-4 text-center bg-linear-light-modal">
        <div className="text-info-error pt-3">
          <PiWarningCircleFill className="size-18 drop-shadow-xl" />
        </div>
        <h3 className="text-info-error">WARNING</h3>
        <p className="body1 text-char-pri w-[260px]">
          Are you sure
          <br />
          You want to delete your account?
        </p>
        <div className="flex flex-col gap-5 md:flex-row">
          <Button
            type="button"
            size="sm"
            variant="success"
            rounded="full"
            className="shadow-info-error/25 shadow-lg bg-info-error border-info-error"
            onClick={onDelete}
          >
            Delete
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            rounded="full"
            onClick={onClose}
          >
            Cancle
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
