import {RootStateType} from "../../b1-store/store";


export const getUsersList = (state: RootStateType) => state.users.users
export const getUsersCurrentPage = (state: RootStateType) => state.users.currentPage
export const getUsersTotalCount = (state: RootStateType) => state.users.totalCount
export const getUsersPageCount = (state: RootStateType) => state.users.pageCount
