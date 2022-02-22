import React from "react"
import {Link} from "react-router-dom"
import styles from "./nav.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../bll/b1-store/store";

export const Nav = () => {

    const ownerUserId = useSelector<RootStateType, number>(state => state.login.authorizedUser.id)

    return (
        <div className={styles.container}>
            <Link to={"/login"}>
                Login
            </Link>
            <Link to={`/profile/${ownerUserId}`}>
                Profile
            </Link>
        </div>
    )
}