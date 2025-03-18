import { FaCircleCheck } from "react-icons/fa6";
import Modal from "./Modal";
import Button from "./common/Button";

interface Props {
  isOpen: boolean
}

const ModalSuccess = ({ isOpen }: Props) => {
  return (
    <Modal isOpen={isOpen} hasCloseBtn={false}>
      <div className="flex flex-col items-center p-6 gap-4 text-center">
        <h3 className="text-success">SUCCESS</h3>
        <p className="body2 text-light-grey w-[260px]">Your account has been created</p>
        <div className="text-success pt-4 pb-8">
          <FaCircleCheck className="size-18 drop-shadow-xl" />
        </div>
        <Button size="sm" variant="success" rounded="full" className="shadow-success/25 shadow-xl">
          CONTINUE &gt;
        </Button>
      </div>
    </Modal>
  );
};

export default ModalSuccess;
