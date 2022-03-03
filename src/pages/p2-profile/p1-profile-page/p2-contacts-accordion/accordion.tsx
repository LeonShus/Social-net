import React from "react"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {useSelector} from "react-redux";
import {ProfileDataType} from "../../../../bll/b2-reducers/r2-profile/profile-reducer";
import {RootStateType} from "../../../../bll/b1-store/store";
import Box from "@mui/material/Box";


export const ContactsAccordion = () => {

    const profile = useSelector<RootStateType, ProfileDataType>(state => state.profile.profile)

    let contacts = []

    for (let key in profile.contacts) {
        let web = key
        //@ts-ignore
        let url = profile.contacts[key]
        if (web && url) {
            let teg =
                <Box
                    key={web}
                    sx={{
                        marginBottom: "10px",
                    }}>
                    <Box
                        sx={{
                            marginBottom: "4px",
                            fontWeight: "600",
                            fontSize: "1.1rem",
                        }}>
                        {`${web} :`}
                    </Box>

                    <a href={url}>
                        {`${url}`}
                    </a>
                </Box>

            contacts.push(teg)
        }
    }

    const accordionStyle = {
        minWidth: "260px",
        border: "3px solid #EFF4FC",
        boxShadow: "none",
    }


    return (
        <div>
            <Accordion sx={accordionStyle}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    sx={{
                        div: {display: "flex", justifyContent: "center"},
                        "&:hover": {
                            color: "#1877F2"
                        }
                    }}
                >
                    Contacts
                </AccordionSummary>
                <AccordionDetails>
                    {contacts}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};