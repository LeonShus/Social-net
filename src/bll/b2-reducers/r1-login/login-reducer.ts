import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {authAPI} from "../../../dal/social-api";

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
        setAuthorizedUser(state: LoginInitialStateType, action: PayloadAction<{authorizedUser: AuthorizedUserType}>){
            state.authorizedUser = action.payload.authorizedUser
        },
        setIsAuth(state: LoginInitialStateType, action: PayloadAction<{isAuth: boolean}>){
            state.isAuth = action.payload.isAuth
        }
    }
})

export const loginReducer = slice.reducer

export const {setAuthorizedUser, setIsAuth} = slice.actions

//THUNK

export const checkAuthUser = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.authMe()

        if(res.data.messages.length > 0){
            console.log(res.data.messages)
        } else {
            dispatch(setAuthorizedUser({authorizedUser: res.data.data}))
        }

    } catch (e) {
        //@ts-ignore
        console.log(e, {...e})
    } finally {

    }
}