import { useState } from "react";
import { Modal } from "../Modal";
import styles from "./Toolbar.module.css";
export const Toolbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      {modalIsOpen && <Modal onClose={() => setModalIsOpen(false)} />}
      <div className={styles.toolbar}>
        <button onClick={handleOpenModal} className={styles.toolbar_btn}>
          +
        </button>
        <p className={styles.logo}>More Shapes</p>
      </div>
    </>
  );
};
