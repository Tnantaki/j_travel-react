import { ReactNode, useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  hasCloseBtn: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal = ({ children, isOpen, onClose, hasCloseBtn }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeydown}
      className="fixed inset-0 flex items-center justify-center backdrop:bg-black/40"
      data-modal
    >
      <div className="bg-dark-grey p-2 w-full">
        {children}
        <div className="flex justify-center">
          {hasCloseBtn && (
            <button className="modal-close-btn" onClick={handleCloseModal}>
              Close
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
