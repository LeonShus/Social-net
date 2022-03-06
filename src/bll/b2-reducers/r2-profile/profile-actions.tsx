import {createAsyncThunk} from "@reduxjs/toolkit";
import {setIsFetchingApp, setPopupMessages} from "../app/app-reducer";
import {profileAPI, ResponseResultCode} from "../../../dal/social-api";
import {v1} from "uuid";
import {ProfileDataType} from "./profile-reducer";

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

            console.log(res)
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