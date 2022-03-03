import React, {useEffect} from "react"
import styles from "./users-page.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../bll/b1-store/store";
import {
    followToUser,
    getUsers,
    setCurrentPage,
    unfollowToUser,
    UserType
} from "../../bll/b2-reducers/r3-users/users-reducer";
import {User} from "./u1-user/user";
import {Paginator} from "../../common/c2-components/c11-paginator/paginator";

export const UsersPage = () => {

    const dispatch = useDispatch()
    const users = useSelector<RootStateType, UserType[]>(state => state.users.users)
    const currentPage = useSelector<RootStateType, number>(state => state.users.currentPage)
    const totalCount = useSelector<RootStateType, number>(state => state.users.totalCount)
    const pageCount = useSelector<RootStateType, number>(state => state.users.pageCount)

    const setPage = (page: number) => {
        dispatch(setCurrentPage({currentPage: page}))
    }

    const followTo = (userId: number) => {
        dispatch(followToUser(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowToUser(userId))
    }


    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch, currentPage])

    const usersComponents = users.map(el => {
        return (
            <div key={el.id}>
                <User
                    userData={el}
                    followTo={followTo}
                    unfollow={unfollow}
                />
            </div>
        )
    })

    return (
        <div className={styles.container}>
            <Paginator
                currentPage={currentPage}
                totalCount={totalCount}
                pageCount={pageCount}
                setPageCallback={setPage}
            />

            <div className={styles.usersContainer}>
                {usersComponents}
            </div>

            <Paginator
                currentPage={currentPage}
                totalCount={totalCount}
                pageCount={pageCount}
                setPageCallback={setPage}
            />
        </div>

    )
}