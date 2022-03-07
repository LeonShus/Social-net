import React, {useEffect} from "react"
import styles from "./App.module.scss"
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Header} from "./common/c2-components/c1-header/header";
import {LoginPage} from "./pages/p1-login/login-page";
import {ProfilePage} from "./pages/p2-profile/p1-profile-page/profile-page";
import {useSelector} from "react-redux";
import {Preloader} from "./common/c2-components/c7-preloader/preloader";
import {UsersPage} from "./pages/p3-users/users-page";
import {SnackBar} from "./common/c2-components/c12-snack-bar/snack-bar";
import {useAction} from "./bll/b4-hooks/hooks";
import {loginActions} from "./bll/b2-reducers/r4-actions";
import {appSelectors} from "./bll/b3-selectors/s4-app";
import {loginSelectors} from "./bll/b3-selectors/s2-login";


export const App = () => {

    const {selectOwnerUserId} = loginSelectors
    const {getAppIsFetching} = appSelectors
    const {checkAuthUser} = useAction(loginActions)
    const isFetching = useSelector(getAppIsFetching)
    const ownerUserId = useSelector(selectOwnerUserId)

    useEffect(() => {
        checkAuthUser({})
    }, [ownerUserId])


    return (
        <HashRouter>
            <div>
                <SnackBar/>
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
