import React, {useEffect, useState} from "react"
import styles from "./profile-page.module.scss"
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {ProfileInfo} from "./p1-profile-info/profile-info";
import {Posts} from "./p3-posts/posts";
import {ProfileEditWindow} from "./p4-profile-edit-window/profile-edit-window";
import {useAction} from "../../../bll/b4-hooks/hooks";
import { loginSelectors } from "../../../bll/b3-selectors/s2-login";
import { profileActions } from "../../../bll/b2-reducers/r2-profile";




export const ProfilePage = () => {

    const ownerUserId = useSelector(loginSelectors.selectOwnerUserId)
    const [editProfile, setEditProfile] = useState(false)
    let {userId} = useParams()
    let userIdNumber = Number(userId)

    const {setUserProfile} = useAction(profileActions)

    const openEditWindow = () => {
        setEditProfile(true)
    }
    const closeEditWindow = () => {
        setEditProfile(false)
    }

    useEffect(() => {
        setUserProfile({userId: userIdNumber})
    }, [userId])


    return (
        <div className={styles.container}>

            {
                ownerUserId === userIdNumber &&
                <div className={styles.editBtnContainer}>
                    <button className={styles.editBtn}
                            onClick={openEditWindow}
                    >
                        &#x205E;
                    </button>
                </div>
            }

            {editProfile && <ProfileEditWindow closeEdit={closeEditWindow}/>}
            <ProfileInfo/>
            <Posts/>
        </div>
    )
}