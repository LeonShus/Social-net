import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {setIsFetchingApp} from "../app/app-reducer";
import {usersAPI} from "../../../dal/social-api";
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
    fallowed: boolean
}

const initialState = {
    users: [] as UserType[],
    currentPage: 1,
    totalCount: 0
}

type UsersInitialStateType = typeof initialState

const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state: UsersInitialStateType, action: PayloadAction<{users: UserType[], totalCount: number}>){
            state.users = action.payload.users
            state.totalCount = action.payload.totalCount
        }
    }

})

export const usersReducer = slice.reducer

export const {setUsers} = slice.actions


//THUNK

export const getUsers = () => async (dispatch: Dispatch, getState: () => RootStateType) => {
    try{
        dispatch(setIsFetchingApp({isFetchingApp: true}))
        const currentPage = getState().users.currentPage

        const res = await usersAPI.getUsers(currentPage)

        dispatch(setUsers({users: res.data.items, totalCount: res.data.totalCount}))

    } catch (e) {
        //@ts-ignore
        console.log(e, {...e})
    } finally {
        dispatch(setIsFetchingApp({isFetchingApp: false}))
    }
}