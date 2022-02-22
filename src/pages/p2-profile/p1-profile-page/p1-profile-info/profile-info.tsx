import React from "react"
import styles from "./profile-info.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../../bll/b1-store/store";
import {ProfileDataType} from "../../../../bll/b2-reducers/r2-profile/profile-reducer";
import {Preloader} from "../../../../common/c2-components/c7-preloader/preloader";
import { ContactsAccordion } from "../p2-contacts-accordion/accordion";



export const ProfileInfo = () => {

    const dispatch = useDispatch()
    const profile = useSelector<RootStateType, ProfileDataType>(state => state.profile.profile)


    console.log(profile)
    if(!profile.userId){
        return <Preloader/>
    }
    return (
        <div className={styles.container}>
            <img src={`${profile.photos.large ? profile.photos.large : ""}`} alt="avatar"/>
            <div className={styles.userName}>
                {profile.fullName}
            </div>
            <div className={styles.statusContainer}>
                status
            </div>

            <ContactsAccordion/>

        </div>
    )
}