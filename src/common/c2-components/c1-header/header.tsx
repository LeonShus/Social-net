import React from "react"
import styles from "./header.module.scss"
import {Nav} from "../c2-nav/nav";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../bll/b1-store/store";
import {CustomButton} from "../c4-button/CustomButton";
import {logoutUser} from "../../../bll/b2-reducers/r1-login/login-reducer";

export const Header = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    const ownerName = useSelector<RootStateType, string>(state => state.login.authorizedUser.login)

    const logout = () => {
        dispatch(logoutUser())
    }

    return(
        <header className={styles.container}>
            <Nav/>

            {isAuth &&
                <div>
                    {ownerName}
                    <CustomButton
                        onClick={logout}
                    >
                        Logout
                    </CustomButton>
                </div>
            }

        </header>
    )
}