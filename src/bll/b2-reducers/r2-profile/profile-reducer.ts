import {createSlice} from "@reduxjs/toolkit";
import {PhotosType} from "../r3-users/users-reducer";
import {profileActions} from "../r4-actions"

const {updateOwnProfileInfo, updateOwnStatus, setUserProfile, uploadProfilePhoto} = profileActions

export type ProfileContacts = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileDataType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContacts
    photos: PhotosType
}

const initialState = {
    profile: {} as ProfileDataType,
    status: ""
}

const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setUserProfile.fulfilled, (state, action) => {
            if (action.payload) {
                state.profile = action.payload.profile
                state.status = action.payload.status
            }
        })
        builder.addCase(updateOwnStatus.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = action.payload.status
            }
        })
        builder.addCase(updateOwnProfileInfo.fulfilled, (state, action) => {
            if (action.payload) {
                state.profile.contacts = action.payload.contacts
                state.profile.fullName = action.payload.fullName
                state.profile.aboutMe = action.payload.aboutMe
            }
        })
        builder.addCase(uploadProfilePhoto.fulfilled, (state, action) => {
            if (action.payload) {
                state.profile.photos = action.payload.photos
            }
        })
    }
})

export const profileReducer = slice.reducer
