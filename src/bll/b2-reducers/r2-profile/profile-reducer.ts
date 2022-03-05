import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PhotosType} from "../r3-users/users-reducer";
import {profileAPI, ResponseResultCode} from "../../../dal/social-api";
import {setIsFetchingApp, setPopupMessages} from "../app/app-reducer";
import {v1} from "uuid";

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


export const setUserProfile = createAsyncThunk(
    "profile/setUserProfile",
    async (param: { userId: number }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))
            const resProfile = await profileAPI.getUserProfile(param.userId)
            const resStatus = await profileAPI.getProfileStatus(param.userId)

            return {profile: resProfile.data, status: resStatus.data}
        } catch (e: any) {
            thunkAPI.dispatch(setPopupMessages({
                popupMessage: {
                    type: "error",
                    message: `${e.response.data.error}`,
                    id: v1()
                }
            }))
        } finally {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: false}))
        }
    }
)

export const updateOwnStatus = createAsyncThunk(
    "profile/updateOwnStatus",
    async (param: { status: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))
            const res = await profileAPI.updateProfileStatus(param.status)

            if (res.data.resultCode === ResponseResultCode.Success) {
                return {status: param.status}
            }
        } catch (e: any) {
            thunkAPI.dispatch(setPopupMessages({
                popupMessage: {
                    type: "error",
                    message: `${e.response.data.error}`,
                    id: v1()
                }
            }))
        } finally {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: false}))
        }
    }
)

export const updateOwnProfileInfo = createAsyncThunk(
    "profile/updateOwnProfileInfo",
    async (param: { data: Omit<ProfileDataType, "photos"> }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))
            const res = await profileAPI.updateProfileInfo(param.data)

            if (res.data.resultCode === ResponseResultCode.Success) {
                return param.data
            }
        } catch (e: any) {
            thunkAPI.dispatch(setPopupMessages({
                popupMessage: {
                    type: "error",
                    message: `${e.response.data.error}`,
                    id: v1()
                }
            }))
        } finally {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: false}))
        }
    }
)

export const uploadProfilePhoto = createAsyncThunk(
    "profile/uploadProfilePhoto",
    async (param: { photoObj: FileList }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))
            const res = await profileAPI.updateProfilePhoto(param.photoObj)


            if (res.data.resultCode === ResponseResultCode.Success) {
                return res.data.data
            }
        } catch (e: any) {
            thunkAPI.dispatch(setPopupMessages({
                popupMessage: {
                    type: "error",
                    message: `${e.response.data.error}`,
                    id: v1()
                }
            }))
        } finally {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: false}))
        }
    }
)


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
