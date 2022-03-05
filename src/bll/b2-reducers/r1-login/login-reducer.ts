import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {authAPI, ResponseResultCode} from "../../../dal/social-api"
import {setIsFetchingApp, setPopupMessages} from "../app/app-reducer"

import {v1} from "uuid"

type AuthorizedUserType = {
    id: number
    login: string
    email: string
}

const initialState = {
    authorizedUser: {} as AuthorizedUserType,
    isAuth: false
}

export const checkAuthUser = createAsyncThunk(
    "login/checkAuthUser",
    async (param: {}, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: true}))
            const res = await authAPI.authMe()

            if (res.data.messages.length > 0) {
                console.log(res.data.messages)
                thunkAPI.dispatch(setPopupMessages({popupMessage: {
                        type: "error",
                        message: `${res.data.messages[0]}`,
                        id: v1()
                    }}

                ))
            } else {
                return {authorizedUser: res.data.data, isAuth: true}
            }

        } catch (e) {
            //@ts-ignore
            console.log(e, {...e})
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
                console.log(res.data.messages)
            }
        } catch (e) {
            //@ts-ignore
            console.log(e, {...e})
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
                console.log(res.data.messages)
            }
        } catch (e) {
            //@ts-ignore
            console.log(e, {...e})
        } finally {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: false}))
        }
    }
)

const slice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(checkAuthUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.authorizedUser = action.payload.authorizedUser
                state.isAuth = action.payload.isAuth
            }
        })
        builder.addCase(singInUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.authorizedUser = action.payload.authorizedUser
            }
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.authorizedUser = action.payload.authorizedUser
                state.isAuth = action.payload.isAuth
            }
        })
    }
})

export const loginReducer = slice.reducer
