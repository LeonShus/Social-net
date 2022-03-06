import React from "react"
import styles from "./profile-info.module.scss"
import {useSelector} from "react-redux";
import {Preloader} from "../../../../common/c2-components/c7-preloader/preloader";
import {ContactsAccordion} from "../p2-contacts-accordion/accordion";
import {EditableSpan} from "../../../../common/c2-components/c8-editable-span/editable-span";
import defaultAvatar from "../../../../common/c3-img/userDefaultAvatar.png"
import {profileSelectors} from "../../../../bll/b3-selectors/s1-profile"
import {loginSelectors} from "../../../../bll/b3-selectors/s2-login";

export const ProfileInfo = () => {

    const {
        selectProfile,
        selectProfileStatus,
        selectProfileUserId,
        selectProfileUserAboutMe
    } = profileSelectors
    const {selectOwnerUserId} = loginSelectors

    const profile = useSelector(selectProfile)
    const userStatus = useSelector(selectProfileStatus)
    const profileId = useSelector(selectProfileUserId)
    const ownerUser = useSelector(selectOwnerUserId)
    const aboutUser = useSelector(selectProfileUserAboutMe)


    if (!profile.userId) {
        return <Preloader/>
    }
    return (
        <div className={styles.container}>
            <img src={`${profile.photos.large ? profile.photos.large : defaultAvatar}`} alt="avatar"/>
            <div className={styles.userName}>
                {profile.fullName}
            </div>

            <div className={styles.statusContainer}>
                {profileId === ownerUser
                    ?
                    <EditableSpan textValue={userStatus}/>
                    :
                    <div>
                        {userStatus || "..."}
                    </div>
                }
            </div>


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