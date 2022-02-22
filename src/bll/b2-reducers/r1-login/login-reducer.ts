import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {authAPI, ResponseResultCode} from "../../../dal/social-api";
import {setIsFetchingApp} from "../app/app-reducer";

type AuthorizedUserType = {
    id: number
    login: string
    email: string
}

const initialState = {
    authorizedUser: {} as AuthorizedUserType,
    isAuth: false
}

type LoginInitialStateType = typeof initialState

const slice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setAuthorizedUser(state: LoginInitialStateType, action: PayloadAction<{ authorizedUser: AuthorizedUserType }>) {
            state.authorizedUser = action.payload.authorizedUser
        },
        setIsAuth(state: LoginInitialStateType, action: PayloadAction<{ isAuth: boolean }>) {
            state.isAuth = action.payload.isAuth
        }
    }
})

export const loginReducer = slice.reducer

export const {setAuthorizedUser, setIsAuth} = slice.actions

//THUNK

export const checkAuthUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingApp({isFetchingApp: true}))
        const res = await authAPI.authMe()

        if (res.data.messages.length > 0) {
            console.log(res.data.messages)
        } else {
            dispatch(setAuthorizedUser({authorizedUser: res.data.data}))
            dispatch(setIsAuth({isAuth: true}))
        }

    } catch (e) {
        //@ts-ignore
        console.log(e, {...e})
    } finally {
        dispatch(setIsFetchingApp({isFetchingApp: false}))
    }
}

export const singInUser = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingApp({isFetchingApp: true}))
        const res = await authAPI.login(email, password, rememberMe)

        if (res.data.resultCode === ResponseResultCode.Success) {
            dispatch(setAuthorizedUser({authorizedUser: {id: res.data.data.userId, email: "", login: ""}}))
        } else {
            console.log(res.data.messages)
        }
    } catch (e) {
        //@ts-ignore
        console.log(e, {...e})
    } finally {
        dispatch(setIsFetchingApp({isFetchingApp: false}))
    }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingApp({isFetchingApp: true}))
        const res = await authAPI.logout()

        if (res.data.resultCode === ResponseResultCode.Success) {
            dispatch(setAuthorizedUser({authorizedUser: {login: "", email: "", id: 0}}))
            dispatch(setIsAuth({isAuth: false}))
        } else {
            console.log(res.data.messages)
        }
    } catch (e) {
        //@ts-ignore
        console.log(e, {...e})
    } finally {
        dispatch(setIsFetchingApp({isFetchingApp: false}))
    }
}