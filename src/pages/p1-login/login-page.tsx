import React from "react"
import {CustomInput} from "../../common/c2-components/c3-input/CustomInput";
import {CustomButton} from "../../common/c2-components/c4-button/CustomButton";


export const LoginPage = () => {
    return(
        <div>
            <form>
                <CustomInput/>
                <CustomInput/>
                <CustomButton>
                    Sing in
                </CustomButton>
            </form>
        </div>
    )
}