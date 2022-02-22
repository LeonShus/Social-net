import React from "react"
import styles from "./login-page.module.scss"
import {CustomInput} from "../../common/c2-components/c3-input/CustomInput";
import {CustomButton} from "../../common/c2-components/c4-button/CustomButton";
import {CustomCheckbox} from "../../common/c2-components/c5-checkbox/CustomCheckbox";


export const LoginPage = () => {
    return(
        <div className={styles.container}>

            <form>
                <CustomInput
                    labelText={"Login"}
                    placeholder={"Email"}
                />
                <CustomInput
                    labelText={"password"}
                    type={"password"}
                    placeholder={"Password"}
                />
                <CustomCheckbox>
                    Remember Me
                </CustomCheckbox>
                <CustomButton>
                    Sing in
                </CustomButton>
            </form>
        </div>
    )
}