import React, {SyntheticEvent} from "react";
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../bll/b1-store/store";
import {deletePopupMessages, PopupMessageType} from "../../../bll/b2-reducers/app/app-reducer";


export const SnackBar = () => {

    let popupMessages = useSelector<RootStateType, PopupMessageType[]>((state => state.app.popupMessages))

    const dispatch = useDispatch()

    const handleClose = (event?: SyntheticEvent<Element, Event> | Event, reason?: string, id?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        if (id) {
            const newPopupArr = popupMessages.filter((i) => i.id !== id)
            dispatch(deletePopupMessages({popupMessages: newPopupArr}))
        }
    }

    const message = popupMessages.map(i =>
        <Snackbar
            key={i.id}
            onClose={(ev, res) =>
                handleClose(ev, res, i.id)}
            open={popupMessages[0] !== undefined}
            autoHideDuration={3000}
            style={{position: 'relative'}}>

            <Alert style={{marginTop: '15px', wordBreak: 'break-all', width: '300px'}} variant={'standard'}
                   onClose={(e) => handleClose(e, '', i.id)} severity={i.type}
                   sx={{width: '100%'}}>
                {i.message}
            </Alert>
        </Snackbar>
    )

    return (
        <div style={
            {
                display: "flex",
                flexDirection: 'column',
                position: 'absolute',
                bottom: "15px",
                left: "24px",
                right: "auto"
            }
        }>
            {message}
        </div>
    )
}