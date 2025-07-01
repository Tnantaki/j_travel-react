import { HiMiniUserGroup } from "react-icons/hi2";
import Modal from "./Modal";
import Button from "../common/Button";

interface Props {
  isOpen: boolean;
  message: string;
  onYes?: () => void;
  onNo?: () => void;
}

const ModalConfirmGroup = ({ isOpen, onYes, onNo, message }: Props) => {
  return (
    <Modal isOpen={isOpen} hasCloseBtn={false}>
      <div className="flex flex-col items-center p-10 gap-4 text-center bg-linear-light-modal">
        <h3 className="text-char-pri">Create Group</h3>
        <p className="body2 text-char-pri w-[260px]">{message}</p>
        <div className="text-char-pri pt-4 pb-8">
          <HiMiniUserGroup className="size-18 drop-shadow-xl" />
        </div>
        <div className="flex flex-row gap-4">
          <Button
            variant="outline"
            rounded="full"
            className="shadow-char-text-char-pri/25 shadow-lg"
            onClick={onNo}
          >
            No
          </Button>
          <Button
            variant="primary"
            rounded="full"
            className="shadow-char-text-char-pri/25 shadow-lg"
            onClick={onYes}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmGroup;
