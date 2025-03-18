import { useState } from "react";
import Modal from "../components/Modal";
import MemberModal from "./booking/MemberModal";
import Button from "../components/common/Button";
import ModalSuccess from "../components/ModalSuccess";

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const toggleModalSuccess = () => setOpenModalSuccess(!openModalSuccess);

  return (
    <>
      <section className="hero">
        <div>About</div>
        <button onClick={() => setIsModalOpen(!isModalOpen)}>Open</button>
        <button onClick={toggleModalSuccess}>Open</button>
      </section>
      <Modal
        hasCloseBtn={true}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <MemberModal />
      </Modal>
      <ModalSuccess isOpen={openModalSuccess} />
    </>
  );
};

export default About;
