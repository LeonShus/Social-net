import React from "react"
import styles from "./modal-window.module.scss"

type ModalWindowPropsType = {
    closeModal: () => void
}

export const ModalWindow: React.FC<ModalWindowPropsType> = (props) => {
    return(
        <div className={styles.modal}>
            <div>
                <button
                    onClick={props.closeModal}
                    className={styles.closeBtn}
                >
                    &#x2715;
                </button>
                <div className={styles.modalWindow}>
                    {props.children}
                </div>
            </div>

        </div>
    )
}