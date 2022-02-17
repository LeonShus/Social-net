import axios from "axios"
import {UserType} from "../bll/b2-reducers/r3-users/users-reducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "099be23b-024b-4d04-8aea-ded1a22de046"
    }
})

export const authAPI = {
    authMe() {
        return instance.get<AuthResponseType<{ id: number, email: string, login: string }>>("auth/me")
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<AuthResponseType<{ userId: number }>>("auth/login", {email, password, rememberMe})
    },
    logout(){
        return instance.delete<AuthResponseType<{}>>("auth/login")
    }
}

export const usersAPI = {
    getUsers(currentPage:number = 1, numberOfUser:number = 10){
        return instance.get<UsersResponseType>("users",{params: {page: currentPage, count: numberOfUser}})
    },
}

//Typization

export type AuthResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
}

export type UsersResponseType = {
    items: UserType[]
    totalCount:number
    error: string | null
}