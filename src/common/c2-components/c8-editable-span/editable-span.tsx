import React, {useState} from "react"
import styles from "./editable-span.module.scss"
import {CustomInput} from "../c3-input/CustomInput";
import {CustomButton} from "../c4-button/CustomButton";
import { profileActions } from "../../../bll/b2-reducers/r4-actions";
import {useAction} from "../../../bll/b4-hooks/hooks";

type EditableSpanPropsType = {
    textValue: string
}

export const EditableSpan = ({textValue}: EditableSpanPropsType) => {

    const {updateOwnStatus} = useAction(profileActions)

    const [value, setValue] = useState("")
    const [editMode, setEditMode] = useState(false)

    const changeValue = (text: string) => {
        setValue(text)
    }

    const editModeOn = () => {
        setEditMode(true)
    }

    const setNewStatus = () => {
        updateOwnStatus({status: value})
        setEditMode(false)
    }

    return (
        <>
            {!editMode &&
            <span
                onClick={editModeOn}
            >
                    {textValue || "..."}
                </span>
            }
            {editMode &&
            <div className={styles.inputContainer}>
                <CustomInput
                    placeholder={"Status"}
                    value={value}
                    onEnter={setNewStatus}
                    onChangeText={changeValue}
                    autoFocus
                />
                <CustomButton
                    onClick={setNewStatus}
                    style={{marginBottom: "5px"}}
                >
                    Change
                </CustomButton>
                <CustomButton
                    onClick={() => setEditMode(false)}
                >
                    Close
                </CustomButton>
            </div>
            }
        </>
    )
}
