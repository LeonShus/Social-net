import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {userAsyncActions} from "../r4-actions";


export type PhotosType = {
    small: null | string
    large: null | string
}

export type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: null | string
    followed: boolean
}

const initialState = {
    users: [] as UserType[],
    currentPage: 1,
    totalCount: 0,
    pageCount: 12,
}

type UsersInitialStateType = typeof initialState


const {getUsers, unfollowToUser, followToUser} = userAsyncActions


export const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentPage(state: UsersInitialStateType, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage
        },
    },
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            if (action.payload) {
                state.users = action.payload.users
                state.totalCount = action.payload.totalCount
            }
        })
        builder.addCase(followToUser.fulfilled, (state, action) => {

            let index = state.users.findIndex(u => u.id === action.payload?.userId)
            if (action.payload) {
                state.users[index] = {...state.users[index], followed: action.payload.isFollow}
            }
        })
        builder.addCase(unfollowToUser.fulfilled, (state, action) => {

            let index = state.users.findIndex(u => u.id === action.payload?.userId)
            if (action.payload) {
                state.users[index] = {...state.users[index], followed: action.payload.isFollow}
            }
        })
    }

})

export const usersReducer = slice.reducer
