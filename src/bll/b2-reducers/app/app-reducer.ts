import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isFetchingApp: false
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setIsFetchingApp(state, action: PayloadAction<{ isFetchingApp: boolean }>) {
            state.isFetchingApp = action.payload.isFetchingApp
        }
    }
})

export const appReducer = slice.reducer

export const {setIsFetchingApp} = slice.actions