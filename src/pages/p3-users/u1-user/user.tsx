import React from "react"
import styles from "./user.module.scss"
import {UserType} from "../../../bll/b2-reducers/r3-users/users-reducer";
import defaultAvatar from "../../../common/c3-img/userDefaultAvatar.png"
import {Link} from "react-router-dom";
import {CustomButton} from "../../../common/c2-components/c4-button/CustomButton";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../bll/b1-store/store";

type UserPropsType = {
    userData: UserType
    followTo: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User = ({userData, followTo, unfollow}: UserPropsType) => {

    const isFetching = useSelector<RootStateType, boolean>(state => state.app.isFetchingApp)

    const followToUser = () => {
        followTo(userData.id)
    }

    const unfollowUser = () => {
        unfollow(userData.id)
    }

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
                <div>
                    <Link to={`/profile/${userData.id}`}>
                        {userData.name}
                    </Link>
                </div>
                <div>
                    {userData.status}
                </div>
            </div>


            <div>
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
    )
}