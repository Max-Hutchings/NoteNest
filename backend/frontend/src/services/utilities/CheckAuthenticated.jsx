import React from "react";
import {Navigate} from "react-router-dom";
import { useSelector } from "react-redux"

function CheckAuthenticated ( { children }){
    const user = useSelector(state => state.auth.user)
    const name = user?.name
    return (
        name ? children : <Navigate to={"/login"} replace />
    )
}

export default CheckAuthenticated