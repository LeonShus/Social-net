import {RootStateType} from "../../b1-store/store";


export const selectProfile = (state: RootStateType) => state.profile.profile
export const selectProfileUserId = (state: RootStateType) => state.profile.profile.userId
export const selectProfileUserFullName = (state: RootStateType) => state.profile.profile.fullName
export const selectProfileStatus = (state: RootStateType) => state.profile.status
export const selectProfileUserAboutMe = (state: RootStateType) => state.profile.profile.aboutMe
export const selectProfileContactGitHub = (state: RootStateType) => state.profile.profile.contacts.github
export const selectProfileContactVk = (state: RootStateType) => state.profile.profile.contacts.vk
export const selectProfileContactFacebook = (state: RootStateType) => state.profile.profile.contacts.facebook
export const selectProfileContactInstagram = (state: RootStateType) => state.profile.profile.contacts.instagram
export const selectProfileContactTwitter = (state: RootStateType) => state.profile.profile.contacts.twitter
export const selectProfileContactWebsite = (state: RootStateType) => state.profile.profile.contacts.website
export const selectProfileContactYoutube = (state: RootStateType) => state.profile.profile.contacts.youtube
export const selectProfileContactMainLink = (state: RootStateType) => state.profile.profile.contacts.mainLink

