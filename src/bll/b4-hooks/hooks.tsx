import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";

export function useAction<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}