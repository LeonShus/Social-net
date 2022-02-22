import React from "react"
import styles from "./title.module.scss"

type TitlePropsType = {
    titleText: string
}

export const Title = ({titleText}: TitlePropsType) => {
    return(
        <div className={styles.container}>
            <h3 className={styles.title}>
                {titleText}
            </h3>
        </div>
    )
}