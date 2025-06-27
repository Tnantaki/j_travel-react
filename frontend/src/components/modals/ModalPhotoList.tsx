import { LiHTMLAttributes, useState } from "react";
import Modal from "./Modal";

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  img: string;
}

const ModalPhotoList = ({ img }: Props) => {
  const [openModalPhoto, setOpenModalPhoto] = useState<boolean>(false);

  return (
    <li className="w-[200px] h-[150px] rounded-sm border-1 border-gray-400 overflow-hidden xs:odd:rotate-6 xs:even:-rotate-6 xs:transition-all xs:duration-200 xs:hover:rotate-0 xs:hover:w-[240px] xs:hover:h-[180px] xs:hover:cursor-pointer">
      <img
        src={img}
        alt="Travel Location photo"
        className="object-center object-cover inset-0 w-full h-full"
        onClick={() => setOpenModalPhoto(true)}
      />
      <Modal
        isOpen={openModalPhoto}
        hasCloseBtn={true}
        onClose={() => setOpenModalPhoto(false)}
      >
        <figure className="bg-frame-qua max-w-[1200px]">
          <img
            src={img}
            alt="Travel Location photo"
            className="object-center object-cover self-center"
          />
        </figure>
      </Modal>
    </li>
  );
};

export default ModalPhotoList;
