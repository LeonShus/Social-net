import {RootStateType} from "../../b1-store/store";

export const selectOwnerUserId = (state: RootStateType) => state.login.authorizedUser.id
