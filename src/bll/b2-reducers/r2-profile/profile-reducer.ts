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
    profile: {} as ProfileDataType,
    status: ""
}

type ProfileInitStateType = typeof initialState

const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile(state: ProfileInitStateType, action: PayloadAction<{ profile: ProfileDataType }>) {
            state.profile = action.payload.profile
        },
        setUserStatus(state: ProfileInitStateType, action: PayloadAction<{ status: string }>){
            state.status = action.payload.status
        }
    }
})

export const profileReducer = slice.reducer

export const {setProfile, setUserStatus} = slice.actions

//THUNK

export const setUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingApp({isFetchingApp: true}))
        const resProfile = await profileAPI.getUserProfile(userId)
        const resStatus = await profileAPI.getProfileStatus(userId)

        dispatch(setProfile({profile: resProfile.data}))
        dispatch(setUserStatus({status: resStatus.data}))
    } catch (e) {
        //@ts-ignore
        console.log(e, {...e})
    } finally {
        dispatch(setIsFetchingApp({isFetchingApp: false}))
    }
}
