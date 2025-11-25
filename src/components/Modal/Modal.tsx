import { useRef } from "react";
import styles from "./Modal.module.css";
import type { IModal } from "./ModalTypes";
import { useClickOutside } from "@/hooks";
import { CreateForm } from "../CreateForm";

export const Modal = ({ onClose }: IModal) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => {
    onClose();
  });
  return (
    <div ref={menuRef} className={styles.modal_container}>
      <div onClick={onClose} className={styles.close_btn} />
      <p className={styles.modal_title}>Создать новую фигуру</p>
      <CreateForm onClose={onClose} />
    </div>
  );
};
