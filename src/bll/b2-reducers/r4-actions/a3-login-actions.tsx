import {createAsyncThunk} from "@reduxjs/toolkit";
import {setIsFetchingApp, setPopupMessages} from "../app/app-reducer";
import {authAPI, ResponseResultCode} from "../../../dal/social-api";
import {v1} from "uuid";

export const checkAuthUser = createAsyncThunk(
    "login/checkAuthUser",
    async (param: {}, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))
            const res = await authAPI.authMe()

            if (res.data.messages.length > 0) {
                // console.log(res.data.messages)
            } else {
                return {authorizedUser: res.data.data, isAuth: true}
            }

        } catch (e: any) {
            thunkAPI.dispatch(setPopupMessages({
                    popupMessage: {
                        type: "error",
                        message: `${e.response.data.error}`,
                        id: v1()
                    }
                }
            ))
        } finally {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: false}))
        }
    }
)

export const singInUser = createAsyncThunk(
    "login/singInUser",
    async (param: { email: string, password: string, rememberMe: boolean }, thunkAPI) => {
        const {email, password, rememberMe} = param
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))
            const res = await authAPI.login(email, password, rememberMe)

            if (res.data.resultCode === ResponseResultCode.Success) {
                return {authorizedUser: {id: res.data.data.userId, email: "", login: ""}}
            } else {
                thunkAPI.dispatch(setPopupMessages({
                    popupMessage: {
                        type: "error",
                        message: `${res.data.messages}`,
                        id: v1()
                    }
                }))
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

export const logoutUser = createAsyncThunk(
    "login/logoutUser",
    async (param: {}, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))
            const res = await authAPI.logout()

            if (res.data.resultCode === ResponseResultCode.Success) {
                return {authorizedUser: {login: "", email: "", id: 0}, isAuth: false}
            } else {
                thunkAPI.dispatch(setPopupMessages({
                    popupMessage: {
                        type: "error",
                        message: `${res.data.messages}`,
                        id: v1()
                    }
                }))
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