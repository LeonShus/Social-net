import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type PopupMessageType = {
    type: "error" | "success"
    message: string
    id: string
}

const initialState = {
    isFetchingApp: false,
    popupMessages: [] as PopupMessageType[]
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setIsFetchingApp(state, action: PayloadAction<{ isFetchingApp: boolean }>) {
            state.isFetchingApp = action.payload.isFetchingApp
        },
        setPopupMessages(state, action: PayloadAction<{ popupMessage: PopupMessageType }>) {
            state.popupMessages.push(action.payload.popupMessage)
        },
        deletePopupMessages(state, action: PayloadAction<{ popupMessages: PopupMessageType[] }>) {
            state.popupMessages = action.payload.popupMessages
        }
    }
})

export const appReducer = slice.reducer

export const {setIsFetchingApp, setPopupMessages, deletePopupMessages} = slice.actions