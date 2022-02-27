import React from "react"
import styles from "./profile-info.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../bll/b1-store/store";
import {ProfileDataType} from "../../../../bll/b2-reducers/r2-profile/profile-reducer";
import {Preloader} from "../../../../common/c2-components/c7-preloader/preloader";
import {ContactsAccordion} from "../p2-contacts-accordion/accordion";
import {EditableSpan} from "../../../../common/c2-components/c8-editable-span/editable-span";


export const ProfileInfo = () => {

    const profile = useSelector<RootStateType, ProfileDataType>(state => state.profile.profile)
    const userStatus = useSelector<RootStateType, string>(state => state.profile.status)
    const profileId = useSelector<RootStateType, number>(state => state.profile.profile.userId)
    const ownerUser = useSelector<RootStateType, number>(state => state.login.authorizedUser.id)


    if (!profile.userId) {
        return <Preloader/>
    }
    return (
        <div className={styles.container}>
            <img src={`${profile.photos.large ? profile.photos.large : ""}`} alt="avatar"/>
            <div className={styles.userName}>
                {profile.fullName}
            </div>
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

            <ContactsAccordion/>

        </div>
    )
}