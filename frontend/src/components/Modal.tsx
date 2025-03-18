import { DialogHTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { cn } from "../utils/cn";

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  hasCloseBtn: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal = ({
  children,
  isOpen,
  onClose,
  hasCloseBtn,
  className,
}: Props) => {
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
      className={cn(
        "backdrop:bg-black/40 mx-auto my-auto rounded-lg border-1 border-gray-600 shadow-gray-500/30 shadow-2xl",
        className
      )}
      data-modal
    >
      {children}
      <div className="flex justify-center">
        {hasCloseBtn && (
          <button className="rounded-lg border-2" onClick={handleCloseModal}>
            Close
          </button>
        )}
      </div>
    </dialog>
  );
};

export default Modal;
