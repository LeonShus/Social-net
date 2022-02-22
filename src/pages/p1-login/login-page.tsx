import React from "react"
import styles from "./login-page.module.scss"
import {CustomInput} from "../../common/c2-components/c3-input/CustomInput";
import {CustomButton} from "../../common/c2-components/c4-button/CustomButton";
import {CustomCheckbox} from "../../common/c2-components/c5-checkbox/CustomCheckbox";
import {Title} from "../../common/c2-components/c6-title/title";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {singInUser} from "../../bll/b2-reducers/r1-login/login-reducer";
import {RootStateType} from "../../bll/b1-store/store";
import {Navigate} from "react-router-dom";


export const LoginPage = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    const ownerUserId = useSelector<RootStateType, number>(state => state.login.authorizedUser.id)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
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

            dispatch(singInUser(email, password, rememberMe))
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
                <CustomButton type={"submit"}>
                    Sing in
                </CustomButton>
            </form>
        </div>
    )
}