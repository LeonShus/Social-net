import React from "react"
import styles from "./preloader.module.scss"

export const Preloader = () => {
    return(
        <div className={styles.container}>
            <div className={styles.loading}>
                <div className={styles.dot}>{""}</div>
                <div className={styles.dot}>{""}</div>
                <div className={styles.dot}>{""}</div>
                <div className={styles.dot}>{""}</div>
                <div className={styles.dot}>{""}</div>
            </div>
        </div>
    )
}