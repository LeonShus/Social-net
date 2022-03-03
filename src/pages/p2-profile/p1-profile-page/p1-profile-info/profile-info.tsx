import React from "react"
import styles from "./profile-info.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../bll/b1-store/store";
import {ProfileDataType} from "../../../../bll/b2-reducers/r2-profile/profile-reducer";
import {Preloader} from "../../../../common/c2-components/c7-preloader/preloader";
import {ContactsAccordion} from "../p2-contacts-accordion/accordion";
import {EditableSpan} from "../../../../common/c2-components/c8-editable-span/editable-span";
import defaultAvatar from "../../../../common/c3-img/userDefaultAvatar.png"


export const ProfileInfo = () => {

    const profile = useSelector<RootStateType, ProfileDataType>(state => state.profile.profile)
    const userStatus = useSelector<RootStateType, string>(state => state.profile.status)
    const profileId = useSelector<RootStateType, number>(state => state.profile.profile.userId)
    const ownerUser = useSelector<RootStateType, number>(state => state.login.authorizedUser.id)
    const aboutUser = useSelector<RootStateType, string>(state => state.profile.profile.aboutMe)


    if (!profile.userId) {
        return <Preloader/>
    }
    return (
        <div className={styles.container}>
            <img src={`${profile.photos.large ? profile.photos.large : defaultAvatar}`} alt="avatar"/>
            <div className={styles.userName}>
                {profile.fullName}
            </div>
            {
                userStatus &&
                <div className={styles.statusContainer}>
                    {profileId === ownerUser
                        ?
                        <EditableSpan textValue={userStatus}/>
                        :
                        <>
                            {userStatus}
                        </>
                    }
                </div>
            }

            {
                aboutUser &&
                <div className={styles.aboutMe}>
                    {aboutUser}
                </div>
            }


            <ContactsAccordion/>

        </div>
    )
}