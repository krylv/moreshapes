import { CreateForm } from '../CreateForm'
import styles from './Modal.module.css'
export const Modal = () => {
    return <div className={styles.modal_container}>
        <p className={styles.modal_title}>Создать новую фигуру</p>
        <CreateForm />
    </div>
}