import React from "react"
import styles from "./modal-window.module.scss"

export const ModalWindow: React.FC = (props) => {
    return(
        <div className={styles.modal}>
            <div className={styles.modalWindow}>
                {props.children}
            </div>
        </div>
    )
}