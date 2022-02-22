import React from "react"
import styles from "./profile-page.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../bll/b1-store/store";
import {Navigate, useParams} from "react-router-dom";


export const ProfilePage = () => {

    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)

    let {userId} = useParams()
    let userIdNumber = Number(userId)

    console.log(userIdNumber)



    if (!isAuth) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div className={styles.container}>
            profile
        </div>
    )
}