import { FaCircleCheck } from "react-icons/fa6";
import Modal from "./Modal";
import LinkButton from "./LinkButton";

interface Props {
  isOpen: boolean;
}

const ModalSuccess = ({ isOpen }: Props) => {
  return (
    <Modal isOpen={isOpen} hasCloseBtn={false}>
      <div className="flex flex-col items-center p-10 gap-4 text-center bg-linear-light-modal">
        <h3 className="text-info-success">SUCCESS</h3>
        <p className="body2 text-char-pri w-[260px]">
          Your account has been created
        </p>
        <div className="text-info-success pt-4 pb-8">
          <FaCircleCheck className="size-18 drop-shadow-xl" />
        </div>
        <LinkButton
          size="sm"
          variant="success"
          rounded="full"
          className="shadow-info-success/25 shadow-lg"
          to="/login"
        >
          CONTINUE &gt;
        </LinkButton>
      </div>
    </Modal>
  );
};

export default ModalSuccess;
