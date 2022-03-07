import React from "react"
import styles from "./user.module.scss"
import {UserType} from "../../../bll/b2-reducers/r3-users/users-reducer";
import defaultAvatar from "../../../common/c3-img/userDefaultAvatar.png"
import {Link} from "react-router-dom";
import {CustomButton} from "../../../common/c2-components/c4-button/CustomButton";
import {useSelector} from "react-redux";
import {appSelectors} from "../../../bll/b3-selectors/s4-app";

type UserPropsType = {
    userData: UserType
    followTo: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User = ({userData, followTo, unfollow}: UserPropsType) => {

    const {getAppIsFetching} = appSelectors

    const isFetching = useSelector(getAppIsFetching)

    const followToUser = () => {
        followTo(userData.id)
    }

    const unfollowUser = () => {
        unfollow(userData.id)
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <div>
                    <img
                        className={styles.avatar}
                        src={userData.photos.large ? userData.photos.large : defaultAvatar}
                        alt="user-avatar"
                    />
                </div>

                <div className={styles.aboutUser}>
                    <div className={styles.userName}>
                        <Link to={`/profile/${userData.id}`}>
                            {userData.name}
                        </Link>
                    </div>
                    <div className={styles.userStatus}>
                        {userData.status ? userData.status : "..."}
                    </div>
                </div>


                <div className={styles.btnContainer}>
                    {
                        userData.followed
                            ?
                            <CustomButton
                                disabled={isFetching}
                                onClick={unfollowUser}
                            >
                                Unfollow
                            </CustomButton>
                            :
                            <CustomButton
                                disabled={isFetching}
                                onClick={followToUser}
                            >
                                Follow
                            </CustomButton>
                    }
                </div>
            </div>

        </div>
    )
}