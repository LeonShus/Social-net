import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PhotosType} from "../r3-users/users-reducer";
import {Dispatch} from "redux";
import {profileAPI} from "../../../dal/social-api";
import {setIsFetchingApp} from "../app/app-reducer";

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

type ProfileInitStateType = typeof initialState

const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile(state: ProfileInitStateType, action: PayloadAction<{ profile: ProfileDataType }>) {
            state.profile = action.payload.profile
        }
    }
})

export const profileReducer = slice.reducer

export const {setProfile} = slice.actions

//THUNK

export const setUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingApp({isFetchingApp: true}))
        const res = await profileAPI.getUserProfile(userId)

        console.log(res)
        dispatch(setProfile({profile: res.data}))
    } catch (e) {
        //@ts-ignore
        console.log(e, {...e})
    } finally {
        dispatch(setIsFetchingApp({isFetchingApp: false}))
    }
}