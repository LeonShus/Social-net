import React, {useEffect} from "react"
import styles from "./profile-page.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../bll/b1-store/store";
import {Navigate, useParams} from "react-router-dom";
import {setUserProfile} from "../../../bll/b2-reducers/r2-profile/profile-reducer";
import {ProfileInfo} from "./p1-profile-info/profile-info";


export const ProfilePage = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)

    let {userId} = useParams()
    let userIdNumber = Number(userId)


    useEffect(() => {
        if(isAuth){
            dispatch(setUserProfile(userIdNumber))
        }
    }, [userId])



    if (!isAuth) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div className={styles.container}>
            <ProfileInfo/>
        </div>
    )
}