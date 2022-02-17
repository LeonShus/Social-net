import {createSlice} from "@reduxjs/toolkit";

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
    users: [] as UserType[]
}


const slice = createSlice({
    name: "users",
    initialState,
    reducers: {

    }

})

export const usersReducer = slice.reducer