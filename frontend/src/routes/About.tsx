import { useState } from "react";
import Modal from "../components/Modal";
import MemberModal from "./booking/MemberModal";

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <section className="hero">
        <div>About</div>
        <button onClick={() => setIsModalOpen(!isModalOpen)}>Open</button>
      </section>
      <Modal
        hasCloseBtn={true}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <MemberModal />
      </Modal>
    </>
  );
};

export default About;
