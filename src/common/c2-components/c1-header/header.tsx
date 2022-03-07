import React from "react"
import styles from "./header.module.scss"
import {Nav} from "../c2-nav/nav";
import {useSelector} from "react-redux";
import {CustomButton} from "../c4-button/CustomButton";
import {Link} from "react-router-dom";
import {loginSelectors} from "../../../bll/b3-selectors/s2-login";
import {useAction} from "../../../bll/b4-hooks/hooks";
import { loginActions } from "../../../bll/b2-reducers/r4-actions";

export const Header = () => {

    const {getIsAuth, selectOwnerUserId, selectOwnerUserLogin} = loginSelectors
    const {logoutUser} = useAction(loginActions)

    const isAuth = useSelector(getIsAuth)
    const ownerName = useSelector(selectOwnerUserLogin)
    const ownerUserId = useSelector(selectOwnerUserId)

    const logout = () => {
        logoutUser({})
    }

    return (
        <header className={styles.container}>

            <div className={styles.navContainer}>
                <Nav/>
            </div>
            {
                isAuth &&
                <div className={styles.ownContainer}>
                    <Link
                        to={`/profile/${ownerUserId}`}
                        className={styles.ownerName}
                    >
                        {ownerName}
                    </Link>
                    <CustomButton
                        onClick={logout}
                        style={{padding: "6px 16px"}}
                    >
                        Logout
                    </CustomButton>
                </div>
            }
            {
                !isAuth &&
                <div className={styles.ownContainer}>
                    <Link
                        to={`/login`}
                        className={styles.ownerName}
                    >
                        Sing In
                    </Link>
                </div>
            }
        </header>
    )
}