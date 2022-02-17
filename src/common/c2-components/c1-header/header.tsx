import React from "react"
import styles from "./header.module.scss"
import {Nav} from "../c2-nav/nav";

export const Header = () => {
    return(
        <header className={styles.container}>
            <Nav/>
        </header>
    )
}