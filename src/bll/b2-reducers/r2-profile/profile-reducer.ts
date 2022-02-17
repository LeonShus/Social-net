import {createSlice} from "@reduxjs/toolkit";
import {PhotosType} from "../r3-users/users-reducer";

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
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContacts
    photos: PhotosType
}

const initialState = {
    profile: {} as ProfileDataType
}

const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {

    }
})

export const profileReducer = slice.reducer