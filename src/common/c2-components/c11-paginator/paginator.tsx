import React, {ChangeEvent} from "react"
import Pagination from "@mui/material/Pagination"

type PaginatorPropsType = {
    currentPage: number
    totalCount: number
    pageCount: number
    setPageCallback: (page: number) => void
}

export const Paginator = ({totalCount, pageCount, currentPage, setPageCallback}: PaginatorPropsType) => {

    const count = Math.ceil(totalCount / pageCount)

    const onChangeHandler = (e: ChangeEvent<unknown>, value: number) => {
        setPageCallback(value)
    }

    return (
        <div>
            <Pagination
                page={currentPage}
                count={!count ? 1 : count}
                onChange={onChangeHandler}
                sx={{margin: "8px 0 8px 0"}}
            />
        </div>
    )
}