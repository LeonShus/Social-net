import * as profileActions from "./a1-profile-actions"
import * as userAsyncActions from "./a2-users-actions"
import {slice} from "../r3-users/users-reducer"
import * as loginActions from "./a3-login-actions"

const usersActions = {
    ...slice.actions
}

export {
    profileActions,
    userAsyncActions,
    usersActions,
    loginActions
}