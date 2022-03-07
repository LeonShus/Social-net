import {RootStateType} from "../../b1-store/store";

export const selectOwnerUserId = (state: RootStateType) => state.login.authorizedUser.id
export const selectOwnerUserLogin = (state: RootStateType) => state.login.authorizedUser.login
export const getIsAuth = (state: RootStateType) => state.login.isAuth