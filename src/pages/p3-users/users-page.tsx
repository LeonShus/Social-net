import React, {useEffect} from "react"
import styles from "./users-page.module.scss"
import {useSelector} from "react-redux";
import {User} from "./u1-user/user";
import {Paginator} from "../../common/c2-components/c11-paginator/paginator";
import {useAction} from "../../bll/b4-hooks/hooks";
import {usersSelectors} from "../../bll/b3-selectors/s3-users";
import { userAsyncActions, usersActions } from "../../bll/b2-reducers/r4-actions";


export const UsersPage = () => {

    const {
        getUsersCurrentPage,
        getUsersPageCount,
        getUsersTotalCount,
        getUsersList
    } = usersSelectors
    const {getUsers, unfollowToUser, followToUser} = useAction(userAsyncActions)
    const {setCurrentPage} = useAction(usersActions)

    const users = useSelector(getUsersList)
    const currentPage = useSelector(getUsersCurrentPage)
    const totalCount = useSelector(getUsersTotalCount)
    const pageCount = useSelector(getUsersPageCount)

    const setPage = (page: number) => {
        setCurrentPage({currentPage: page})
    }

    const followTo = (userId: number) => {
        followToUser({userId})
    }
    const unfollow = (userId: number) => {
        unfollowToUser({userId})
    }


    useEffect(() => {
        getUsers({})
    }, [currentPage])

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