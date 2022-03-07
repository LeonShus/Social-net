import {createSlice} from "@reduxjs/toolkit"
import { loginActions } from "../r4-actions"

type AuthorizedUserType = {
    id: number
    login: string
    email: string
}

const initialState = {
    authorizedUser: {} as AuthorizedUserType,
    isAuth: false
}

const {logoutUser, singInUser, checkAuthUser} = loginActions


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
