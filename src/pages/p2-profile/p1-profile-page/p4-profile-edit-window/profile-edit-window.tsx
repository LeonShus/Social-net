import React, {ChangeEvent} from "react"
import styles from "./profile-edit-window.module.scss"
import {ModalWindow} from "../../../../common/c2-components/c10-modal-window/modal-window";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Title} from "../../../../common/c2-components/c6-title/title";
import {useSelector} from "react-redux";
import {CustomInput} from "../../../../common/c2-components/c3-input/CustomInput";
import {CustomButton} from "../../../../common/c2-components/c4-button/CustomButton";
import {ProfileDataType} from "../../../../bll/b2-reducers/r2-profile/profile-reducer";
import {useAction} from "../../../../bll/b4-hooks/hooks";
import {profileActions} from "../../../../bll/b2-reducers/r4-actions";
import {profileSelectors} from "../../../../bll/b3-selectors/s1-profile";


type ProfileEditWindowPropsType = {
    closeEdit: () => void
}

export const ProfileEditWindow = ({closeEdit}: ProfileEditWindowPropsType) => {

    const {
        selectProfileUserId,
        selectProfileUserFullName,
        selectProfileUserAboutMe,
        selectProfileContactGitHub,
        selectProfileContactVk,
        selectProfileContactFacebook,
        selectProfileContactInstagram,
        selectProfileContactTwitter,
        selectProfileContactWebsite,
        selectProfileContactYoutube,
        selectProfileContactMainLink
    } = profileSelectors

    const {uploadProfilePhoto, updateOwnProfileInfo} = useAction(profileActions)

    const userId = useSelector(selectProfileUserId)
    const userFullName = useSelector(selectProfileUserFullName)
    const userAboutMe = useSelector(selectProfileUserAboutMe)
    const contactGitHub = useSelector(selectProfileContactGitHub)
    const contactVk = useSelector(selectProfileContactVk)
    const contactFacebook = useSelector(selectProfileContactFacebook)
    const contactInstagram = useSelector(selectProfileContactInstagram)
    const contactTwitter = useSelector(selectProfileContactTwitter)
    const contactWebsite = useSelector(selectProfileContactWebsite)
    const contactYoutube = useSelector(selectProfileContactYoutube)
    const contactMainLink = useSelector(selectProfileContactMainLink)
    const validUrl = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/


    const uploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        event.currentTarget.files &&
        uploadProfilePhoto({photoObj: event.currentTarget.files})
    }

    const formik = useFormik({
        initialValues: {
            name: userFullName,
            aboutMe: userAboutMe,
            github: contactGitHub,
            vk: contactVk,
            facebook: contactFacebook,
            instagram: contactInstagram,
            twitter: contactTwitter,
            website: contactWebsite,
            youtube: contactYoutube,
            mainLink: contactMainLink
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Min name 3 char"),
            aboutMe: Yup.string()
                .max(100, "Max char is 100"),
            github: Yup.string()
                .matches(validUrl, "Enter correct url"),
            vk: Yup.string()
                .matches(validUrl, "Enter correct url"),
            facebook: Yup.string()
                .matches(validUrl, "Enter correct url"),
            instagram: Yup.string()
                .matches(validUrl, "Enter correct url"),
            twitter: Yup.string()
                .matches(validUrl, "Enter correct url"),
            website: Yup.string()
                .matches(validUrl, "Enter correct url"),
            youtube: Yup.string()
                .matches(validUrl, "Enter correct url"),
        }),
        onSubmit: (values) => {

            let {name, aboutMe, github, vk, facebook, instagram, twitter, website, youtube, mainLink} = values
            const data: Omit<ProfileDataType, "photos"> = {
                userId,
                aboutMe,
                fullName: name,
                lookingForAJob: false,
                lookingForAJobDescription: "...",
                contacts: {
                    github,
                    vk,
                    facebook,
                    instagram,
                    twitter,
                    website,
                    youtube,
                    mainLink
                }
            }
            updateOwnProfileInfo({data})
            closeEdit()
        }
    })

    return (
        <ModalWindow closeModal={closeEdit}>
            <div className={styles.container}>

                <Title titleText={"Edit Profile"}/>

                <div className={styles.uploadContainer}>
                    <label
                        htmlFor="upload-photo"
                    >
                        Change Photo
                    </label>
                    <input
                        id={"upload-photo"}
                        type="file"
                        className={styles.fileInput}
                        onChange={uploadPhoto}
                    />
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <CustomInput
                        labelText={"name"}
                        placeholder={"Name"}
                        errorMessage={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                        {...formik.getFieldProps("name")}
                    />
                    <CustomInput
                        labelText={"about Me"}
                        placeholder={"About Me"}
                        errorMessage={formik.touched.aboutMe && formik.errors.aboutMe ? formik.errors.aboutMe : ""}
                        {...formik.getFieldProps("aboutMe")}
                    />
                    <CustomInput
                        labelText={"github"}
                        placeholder={"Github"}
                        errorMessage={formik.touched.github && formik.errors.github ? formik.errors.github : ""}
                        {...formik.getFieldProps("github")}
                    />
                    <CustomInput
                        labelText={"vk"}
                        placeholder={"Vk"}
                        errorMessage={formik.touched.vk && formik.errors.vk ? formik.errors.vk : ""}
                        {...formik.getFieldProps("vk")}
                    />
                    <CustomInput
                        labelText={"facebook"}
                        placeholder={"Facebook"}
                        errorMessage={formik.touched.facebook && formik.errors.facebook ? formik.errors.facebook : ""}
                        {...formik.getFieldProps("facebook")}
                    />
                    <CustomInput
                        labelText={"instagram"}
                        placeholder={"Instagram"}
                        errorMessage={formik.touched.instagram && formik.errors.instagram ? formik.errors.instagram : ""}
                        {...formik.getFieldProps("instagram")}
                    />
                    <CustomInput
                        labelText={"twitter"}
                        placeholder={"Twitter"}
                        errorMessage={formik.touched.twitter && formik.errors.twitter ? formik.errors.twitter : ""}
                        {...formik.getFieldProps("twitter")}
                    />
                    <CustomInput
                        labelText={"website"}
                        placeholder={"Website"}
                        errorMessage={formik.touched.website && formik.errors.website ? formik.errors.website : ""}
                        {...formik.getFieldProps("website")}
                    />
                    <CustomInput
                        labelText={"youtube"}
                        placeholder={"Youtube"}
                        errorMessage={formik.touched.youtube && formik.errors.youtube ? formik.errors.youtube : ""}
                        {...formik.getFieldProps("youtube")}
                    />
                    <CustomInput
                        labelText={"main Link"}
                        placeholder={"Main Link"}
                        {...formik.getFieldProps("mainLink")}
                    />
                    <div className={styles.btnContainer}>
                        <CustomButton type={"submit"}>
                            Edit
                        </CustomButton>
                    </div>

                </form>
            </div>
        </ModalWindow>
    )
}