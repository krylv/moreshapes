import { useState } from 'react'
import { useShapeStore } from '../../store'
import { Modal } from '../Modal'
import { Circle } from '../shapes/Shapes'
import styles from './Toolbar.module.css'
export const Toolbar = () => {
    const {addShape} = useShapeStore()
    const [modalIsOpen,setModalIsOpen] = useState<boolean>(false)
    const handleOpenModal = () => {
        setModalIsOpen(true)
    }

    return (
        <>
        {modalIsOpen && <Modal />}
        <div className={styles.toolbar}>
        <button onClick={handleOpenModal} className={styles.toolbar_btn}>+</button>
        <button className={styles.toolbar_btn}>+</button>
        <button className={styles.toolbar_btn}>+</button>
        <button className={styles.toolbar_btn}>+</button>
        <button className={styles.toolbar_btn}>+</button>
    </div>
    </>
    )
}