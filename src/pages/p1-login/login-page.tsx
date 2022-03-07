import React from "react"
import styles from "./login-page.module.scss"
import {CustomInput} from "../../common/c2-components/c3-input/CustomInput";
import {CustomButton} from "../../common/c2-components/c4-button/CustomButton";
import {CustomCheckbox} from "../../common/c2-components/c5-checkbox/CustomCheckbox";
import {Title} from "../../common/c2-components/c6-title/title";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {RootStateType} from "../../bll/b1-store/store";
import {Navigate} from "react-router-dom";
import {useAction} from "../../bll/b4-hooks/hooks";
import {loginActions} from "../../bll/b2-reducers/r4-actions";


export const LoginPage = () => {

    const {singInUser} = useAction(loginActions)
    const isFetching = useSelector<RootStateType, boolean>(state => state.app.isFetchingApp)
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    const ownerUserId = useSelector<RootStateType, number>(state => state.login.authorizedUser.id)

    const formik = useFormik({
        initialValues: {
            email: "free@samuraijs.com",
            password: "free",
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .required("Required"),
        }),
        onSubmit: (values) => {
            let {email, password, rememberMe} = values

            singInUser({email, password, rememberMe})
        },
    });

    if (isAuth) {
        return <Navigate to={`/profile/${ownerUserId}`}/>
    }

    return (
        <div className={styles.container}>
            <Title titleText={"Sing In"}/>
            <form
                onSubmit={formik.handleSubmit}
                className={styles.formContainer}
            >
                <CustomInput
                    labelText={"Login"}
                    placeholder={"Email"}
                    errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                    {...formik.getFieldProps("email")}
                />
                <CustomInput
                    labelText={"password"}
                    type={"password"}
                    placeholder={"Password"}
                    errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                    {...formik.getFieldProps("password")}
                />
                <CustomCheckbox
                    {...formik.getFieldProps("rememberMe")}
                >
                    Remember Me
                </CustomCheckbox>
                <CustomButton 
                    type={"submit"}
                    disabled={isFetching}
                >
                    Sing in
                </CustomButton>
            </form>

            <div className={styles.infoContainer}>
                <p>To log in get registered
                    <a href={"https://social-network.samuraijs.com/"}
                       target={"_blank"}> here
                    </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
        </div>
    )
}