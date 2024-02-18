import React from "react";
import "./navbar_addons.css"
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

function NavbarAddons(props){

    const user = useSelector(state => state.auth.user);
    // const name = user?.name;

    function closeNav(){
        props.toggleMobileMenu();
    }

    return(
        <div className={`navbar-navigation row ${props.mobileFirst? "navbar-mobile":""}`}>
            { props.mobileFirst ?
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <link onClick={closeNav}>
                        <CloseIcon
                            sx={{ fontSize: "3rem" }}
                            className={"navbar-navigation-close"}

                        />
                    </link>
                </div>  : null}
            <Link className={`col navbar-navigation-links ${props.mobileFirst ? "mobile-bottom-border" : null}`} to={"/dashboard"}>Dashboard</Link>
            {user ? <Link className={`col navbar-navigation-links ${props.mobileFirst ? "mobile-bottom-border" : null}`} to={"/"} onClick={props.logoutUser} >Logout</Link>
                :
                <Link className={"col navbar-navigation-links"} to={"/login"}>
                    <button className={" btn navbar-navigation-create-account-btn"}>
                        Login
                    </button>
                </Link> }


        </div>
    )
}


export default NavbarAddons