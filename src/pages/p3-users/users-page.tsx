import React, {useEffect} from "react"
import styles from "./users-page.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../bll/b1-store/store";
import {getUsers, UserType} from "../../bll/b2-reducers/r3-users/users-reducer";
import {User} from "./u1-user/user";

export const UsersPage = () => {

    const dispatch = useDispatch()
    const users = useSelector<RootStateType, UserType[]>(state => state.users.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const usersComponents = users.map(el => {
        return(
            <div key={el.id}>
                <User userData={el}/>
            </div>
        )
    })

    return(
        <div className={styles.container}>
            {usersComponents}
        </div>
    )
}