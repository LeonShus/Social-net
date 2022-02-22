import React, {useEffect} from "react"
import styles from "./App.module.scss"
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Header} from "./common/c2-components/c1-header/header";
import {LoginPage} from "./pages/p1-login/login-page";
import {ProfilePage} from "./pages/p2-profile/p1-profile-page/profile-page";
import {useDispatch} from "react-redux";
import {checkAuthUser} from "./bll/b2-reducers/r1-login/login-reducer";


export const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuthUser())
    }, [])

    return (
        <HashRouter>
            <div>
                <Header/>
                <div className={styles.contentContainer}>
                    <Routes>
                        <Route path="/" element={<Navigate to={"/login"}/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    )
}
