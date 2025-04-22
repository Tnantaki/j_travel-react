import { DialogHTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { cn } from "../../utils/cn";
import { motion } from "motion/react";

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
  hasCloseBtn: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const ModalAnimation = ({
  children,
  onClose,
  hasCloseBtn,
  className,
}: Props) => {
  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      className={cn(
        "backdrop:bg-black/40 mx-auto my-auto rounded-lg border-1 border-gray-300 shadow-gray-500/30 shadow-2xl",
        className
      )}
    >
      {children}
      <div className="flex justify-center">
        {hasCloseBtn && (
          <button
            className="absolute top-0 right-0 m-2 p-1 rounded-full bg-frame-sec hover:cursor-pointer hover:bg-frame-ter"
            onClick={onClose}
          >
            <IoClose className="size-8 fill-gray-500" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ModalAnimation;
