import {createAsyncThunk} from "@reduxjs/toolkit";
import {setIsFetchingApp, setPopupMessages} from "../app/app-reducer";
import {RootStateType} from "../../b1-store/store";
import {ResponseResultCode, usersAPI} from "../../../dal/social-api";
import {v1} from "uuid";

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (param: {}, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))
            const state = thunkAPI.getState() as RootStateType
            const currentPage = state.users.currentPage
            const pageCount = state.users.pageCount


            const res = await usersAPI.getUsers(currentPage, pageCount)

            return {users: res.data.items, totalCount: res.data.totalCount}

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

export const followToUser = createAsyncThunk(
    "users/followToUser",
    async (param: { userId: number }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))

            let res = await usersAPI.followToUser(param.userId)

            if (res.data.resultCode === ResponseResultCode.Success) {
                return {userId: param.userId, isFollow: true}
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


export const unfollowToUser = createAsyncThunk(
    "users/unfollowToUser",
    async (param: { userId: number }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))

            let res = await usersAPI.unfollowUser(param.userId)

            if (res.data.resultCode === ResponseResultCode.Success) {
                return {userId: param.userId, isFollow: false}
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
