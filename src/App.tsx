import React, {useEffect} from "react"
import styles from "./App.module.scss"
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Header} from "./common/c2-components/c1-header/header";
import {LoginPage} from "./pages/p1-login/login-page";
import {ProfilePage} from "./pages/p2-profile/p1-profile-page/profile-page";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthUser} from "./bll/b2-reducers/r1-login/login-reducer";
import {RootStateType} from "./bll/b1-store/store";
import {Preloader} from "./common/c2-components/c7-preloader/preloader";
import {UsersPage} from "./pages/p3-users/users-page";


export const App = () => {

    const dispatch = useDispatch()
    const isFetching = useSelector<RootStateType, boolean>(state => state.app.isFetchingApp)
    const ownerUserId = useSelector<RootStateType, number>(state => state.login.authorizedUser.id)

    useEffect(() => {
        dispatch(checkAuthUser({}))
    }, [dispatch, ownerUserId])


    return (
        <HashRouter>
            <div>
                {isFetching && <Preloader/>}
                <Header/>
                <div className={styles.contentContainer}>
                    <Routes>
                        <Route path={"/"} element={<Navigate to={"/login"}/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/profile/:userId"} element={<ProfilePage/>}/>
                        <Route path={"/users"} element={<UsersPage/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    )
}
