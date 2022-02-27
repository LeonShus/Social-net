import React, {useState} from "react"
import styles from "./editable-span.module.scss"
import {CustomInput} from "../c3-input/CustomInput";
import {CustomButton} from "../c4-button/CustomButton";
import {updateOwnStatus} from "../../../bll/b2-reducers/r2-profile/profile-reducer";
import {useDispatch} from "react-redux";

type EditableSpanPropsType = {
    textValue: string
}

export const EditableSpan = ({textValue}: EditableSpanPropsType) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState("")
    const [editMode, setEditMode] = useState(false)

    const changeValue = (text: string) => {
        setValue(text)
    }

    const editModeOn = () => {
        setEditMode(true)
    }

    const setNewStatus = () => {
        dispatch(updateOwnStatus(value))
        setEditMode(false)
    }

    return (
        <>
            {!editMode &&
            <span
                onClick={editModeOn}
            >
                    {textValue}
                </span>
            }
            {editMode &&
            <div className={styles.inputContainer}>
                <CustomInput
                    placeholder={"Status"}
                    value={value}
                    onEnter={setNewStatus}
                    onChangeText={changeValue}
                />
                <CustomButton
                    onClick={setNewStatus}
                >
                    Change
                </CustomButton>
            </div>
            }
        </>
    )
}
