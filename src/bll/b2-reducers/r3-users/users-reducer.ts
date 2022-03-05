import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {setIsFetchingApp} from "../app/app-reducer";
import {authAPI, ResponseResultCode, usersAPI} from "../../../dal/social-api";
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

        } catch (e) {
            //@ts-ignore
            console.log(e, {...e})
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

        } catch (e) {
            //@ts-ignore
            console.log(e, {...e})
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

        } catch (e) {
            //@ts-ignore
            console.log(e, {...e})
        } finally {
            thunkAPI.dispatch(setIsFetchingApp({isFetchingApp: false}))
        }
    }
)



// export const unfollowToUser1 = (userId: number) => async (dispatch: Dispatch) => {
//     try {
//         dispatch(setIsFetchingApp({isFetchingApp: true}))
//
//         let res = await usersAPI.unfollowUser(userId)
//
//         if (res.data.resultCode === ResponseResultCode.Success) {
//             dispatch(followUserHandler({userId, isFollow: false}))
//         }
//
//     } catch (e) {
//         //@ts-ignore
//         console.log(e, {...e})
//     } finally {
//         dispatch(setIsFetchingApp({isFetchingApp: false}))
//     }
// }

// export const followToUser1 = (userId: number) => async (dispatch: Dispatch) => {
//     try {
//         dispatch(setIsFetchingApp({isFetchingApp: true}))
//
//         let res = await usersAPI.followToUser(userId)
//
//         if (res.data.resultCode === ResponseResultCode.Success) {
//             dispatch(followUserHandler({userId, isFollow: true}))
//         }
//
//     } catch (e) {
//         //@ts-ignore
//         console.log(e, {...e})
//     } finally {
//         dispatch(setIsFetchingApp({isFetchingApp: false}))
//     }
// }

// export const getUsers1 = () => async (dispatch: Dispatch, getState: () => RootStateType) => {
//     try{
//         dispatch(setIsFetchingApp({isFetchingApp: true}))
//         const currentPage = getState().users.currentPage
//         const pageCount = getState().users.pageCount
//
//
//         const res = await usersAPI.getUsers(currentPage,pageCount)
//
//         dispatch(setUsers({users: res.data.items, totalCount: res.data.totalCount}))
//
//     } catch (e) {
//         //@ts-ignore
//         console.log(e, {...e})
//     } finally {
//         dispatch(setIsFetchingApp({isFetchingApp: false}))
//     }
// }


const slice = createSlice({
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
            if(action.payload){
                state.users[index] = {...state.users[index], followed: action.payload.isFollow}
            }
        })
        builder.addCase(unfollowToUser.fulfilled, (state, action) => {

            let index = state.users.findIndex(u => u.id === action.payload?.userId)
            if(action.payload){
                state.users[index] = {...state.users[index], followed: action.payload.isFollow}
            }
        })
    }

})

export const usersReducer = slice.reducer

export const {setCurrentPage} = slice.actions
