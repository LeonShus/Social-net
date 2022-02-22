import {combineReducers} from "redux";
import {loginReducer} from "../b2-reducers/r1-login/login-reducer";
import {profileReducer} from "../b2-reducers/r2-profile/profile-reducer";
import {usersReducer} from "../b2-reducers/r3-users/users-reducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk"
import {appReducer} from "../b2-reducers/app/app-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    profile: profileReducer,
    users: usersReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store