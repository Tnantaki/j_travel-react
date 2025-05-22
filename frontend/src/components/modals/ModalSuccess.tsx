import { FaCircleCheck } from "react-icons/fa6";
import Modal from "./Modal";
import LinkButton from "../common/LinkButton";
import Button from "../common/Button";

interface Props {
  isOpen: boolean;
  message: string;
  to?: string;
  onClose?: () => void;
}

const ModalSuccess = ({ isOpen, to, onClose, message }: Props) => {
  return (
    <Modal isOpen={isOpen} hasCloseBtn={false}>
      <div className="flex flex-col items-center p-10 gap-4 text-center bg-linear-light-modal">
        <h3 className="text-info-success">SUCCESS</h3>
        <p className="body2 text-char-pri w-[260px]">{message}</p>
        <div className="text-info-success pt-4 pb-8">
          <FaCircleCheck className="size-18 drop-shadow-xl" />
        </div>
        {to && (
          <LinkButton
            size="sm"
            variant="success"
            rounded="full"
            className="shadow-info-success/25 shadow-lg"
            to={to}
          >
            CONTINUE &gt;
          </LinkButton>
        )}
        {onClose && (
          <Button
            size="sm"
            variant="success"
            rounded="full"
            className="shadow-info-success/25 shadow-lg"
            onClick={onClose}
          >
            CONTINUE &gt;
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ModalSuccess;
