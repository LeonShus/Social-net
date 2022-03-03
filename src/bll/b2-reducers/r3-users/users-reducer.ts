import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {setIsFetchingApp} from "../app/app-reducer";
import {ResponseResultCode, usersAPI} from "../../../dal/social-api";
import {RootStateType} from "../../b1-store/store";

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

const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state: UsersInitialStateType, action: PayloadAction<{users: UserType[], totalCount: number}>){
            state.users = action.payload.users
            state.totalCount = action.payload.totalCount
        },
        setCurrentPage(state: UsersInitialStateType, action: PayloadAction<{currentPage: number}>){
            state.currentPage = action.payload.currentPage
        },
        followUserHandler(state: UsersInitialStateType, action: PayloadAction<{userId: number, isFollow: boolean}>){
            let index = state.users.findIndex(u => u.id === action.payload.userId)

            state.users[index] = {...state.users[index], followed: action.payload.isFollow}
        }
    }

})

export const usersReducer = slice.reducer

export const {setUsers, setCurrentPage, followUserHandler} = slice.actions


//THUNK

export const getUsers = () => async (dispatch: Dispatch, getState: () => RootStateType) => {
    try{
        dispatch(setIsFetchingApp({isFetchingApp: true}))
        const currentPage = getState().users.currentPage
        const pageCount = getState().users.pageCount


        const res = await usersAPI.getUsers(currentPage,pageCount)

        dispatch(setUsers({users: res.data.items, totalCount: res.data.totalCount}))

    } catch (e) {
        //@ts-ignore
        console.log(e, {...e})
    } finally {
        dispatch(setIsFetchingApp({isFetchingApp: false}))
    }
}


export const followToUser = (userId: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingApp({isFetchingApp: true}))

        let res = await usersAPI.followToUser(userId)

        if(res.data.resultCode === ResponseResultCode.Success){
            dispatch(followUserHandler({userId, isFollow: true}))
        }

    } catch (e) {
        //@ts-ignore
        console.log(e, {...e})
    } finally {
        dispatch(setIsFetchingApp({isFetchingApp: false}))
    }
}

export const unfollowToUser = (userId: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingApp({isFetchingApp: true}))

        let res = await usersAPI.unfollowUser(userId)

        if(res.data.resultCode === ResponseResultCode.Success){
            dispatch(followUserHandler({userId, isFollow: false}))
        }

    } catch (e) {
        //@ts-ignore
        console.log(e, {...e})
    } finally {
        dispatch(setIsFetchingApp({isFetchingApp: false}))
    }
}