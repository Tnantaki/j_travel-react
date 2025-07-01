import { PiWarningCircleFill } from "react-icons/pi";
import Modal from "./Modal";
import Button from "../common/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ModalCancelPlan = ({ isOpen, onClose, onDelete }: Props) => {
  return (
    <Modal isOpen={isOpen} hasCloseBtn={false}>
      <div className="flex flex-col items-center p-10 gap-4 text-center bg-linear-light-modal">
        <div className="text-red-500 pt-3">
          <PiWarningCircleFill className="size-18 drop-shadow-xl" />
        </div>
        <h3 className="text-red-500">CANCEL PLAN</h3>
        <p className="body1 text-char-pri w-[260px]">
          Are you sure
          <br />
          You want to cancel the plan
        </p>
        <div className="flex flex-col gap-5 md:flex-row">
          <Button
            type="button"
            size="sm"
            variant="success"
            rounded="full"
            className="shadow-red-500/25 shadow-lg bg-red-500 border-red-500"
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

export default ModalCancelPlan;
