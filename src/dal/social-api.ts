import axios from "axios"
import {UserType} from "../bll/b2-reducers/r3-users/users-reducer";
import {ProfileDataType} from "../bll/b2-reducers/r2-profile/profile-reducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "099be23b-024b-4d04-8aea-ded1a22de046"
    }
})
//AUTH
export const authAPI = {
    authMe() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>("auth/me")
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType<{ userId: number }>>("auth/login", {email, password, rememberMe})
    },
    logout() {
        return instance.delete<ResponseType<{}>>("auth/login")
    }
}

//PROFILE
export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileDataType>(`profile/${userId}`)
    },
    updateProfileInfo(profileInfo: Omit<ProfileDataType, "photos">) {
        return instance.put<ResponseType<{}>>("profile",profileInfo)
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateProfileStatus(status: string) {
        return instance.put<ResponseType<{}>>("profile/status", {status})
    },
    updateProfilePhoto(image: string) {
        return instance.put<ResponseType<{}>>("profile/photo", {image})
    }
}

//USERS
export const usersAPI = {
    getUsers(currentPage: number = 1, numberOfUser: number = 10) {
        return instance.get<UsersResponseType>("users", {params: {page: currentPage, count: numberOfUser}})
    },
    isFollowUser(userId: number) {
        return instance.get<boolean>(`follow/${userId}`)
    },
    followToUser(userId: number) {
        return instance.post<ResponseType<{}>>(`follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete<ResponseType<{}>>(`follow/${userId}`)
    }
}


//Typization

export enum ResponseResultCode {
    Success,
    Error,
}

export type ResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
}

export type UsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}