import React from "react"
import { Link } from "react-router-dom"
import styles from "./nav.module.scss"

export const Nav = () => {
    return(
        <div className={styles.container}>
            <Link to={"/login"}>
                Login
            </Link>
            <Link to={"/profile"}>
                Profile
            </Link>
        </div>
    )
}