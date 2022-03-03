import React, {useEffect, useState} from "react"
import styles from "./profile-page.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../bll/b1-store/store";
import {Navigate, useParams} from "react-router-dom";
import {setUserProfile} from "../../../bll/b2-reducers/r2-profile/profile-reducer";
import {ProfileInfo} from "./p1-profile-info/profile-info";
import {Posts} from "./p3-posts/posts";
import {ProfileEditWindow} from "./p4-profile-edit-window/profile-edit-window";


export const ProfilePage = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    const [editProfile, setEditProfile] = useState(false)
    let {userId} = useParams()
    let userIdNumber = Number(userId)

    const openEditWindow = () => {
        setEditProfile(true)
    }
    const closeEditWindow = () => {
        setEditProfile(false)
    }

    useEffect(() => {
        if (isAuth) {
            dispatch(setUserProfile(userIdNumber))
        }
    }, [userId])


    if (!isAuth) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div className={styles.container}>
            <div className={styles.editBtnContainer}>
                <button className={styles.editBtn}
                        onClick={openEditWindow}
                >
                    &#x205E;
                </button>
            </div>
            {editProfile && <ProfileEditWindow closeEdit={closeEditWindow}/>}
            <ProfileInfo/>
            <Posts/>
        </div>
    )
}