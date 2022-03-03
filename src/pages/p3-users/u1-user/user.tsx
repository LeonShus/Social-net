import React, {useEffect} from "react"
import styles from "./user.module.scss"
import {UserType} from "../../../bll/b2-reducers/r3-users/users-reducer";
import defaultAvatar from "../../../common/c3-img/userDefaultAvatar.png"
import { Link } from "react-router-dom";

type UserPropsType = {
    userData: UserType
}

export const User = ({userData}: UserPropsType) => {
    return (
        <div className={styles.container}>

            <div>
                <img
                    className={styles.avatar}
                    src={userData.photos.large ? userData.photos.large : defaultAvatar}
                    alt="user-avatar"
                />
            </div>
            <div>
                <Link to={`/profile/${userData.id}`}>
                    {userData.name}
                </Link>

            </div>
        </div>
    )
}