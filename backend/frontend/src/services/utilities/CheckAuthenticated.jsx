import React from "react";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../slices/UserAthenticationSlice"

function CheckAuthenticated ( { children }){
    const user = useSelector(state => state.auth.user)
    const name = user?.name
    return (
        name ? children : <Navigate to={"/login"} replace />
    )
}

function CheckNotAuthenticated({ children }){
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const name = user?.name;
    if (!name){
        dispatch(logout());
    }
    return children;

}

export{CheckNotAuthenticated, CheckAuthenticated};