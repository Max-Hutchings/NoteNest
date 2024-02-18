import React from "react";
import {Link} from "react-router-dom";


function LoginForm(props){
    const isMobile = props.isMobile


    return (
        <div className={`${isMobile? "col-10": "col-sm-4 col-md-4"}`}>
                    <form className={"authenticate-form"}>
                        <h2 className={"authenticate-form-title"}>Login</h2>
                        <input className={" authenticate-form-field"} onChange={props.updateForm} name={"email"} placeholder={"Email"}/>
                        <input className={" authenticate-form-field"} onChange={props.updateForm} name={"password"} placeholder={"Password"}/>
                        <button className={"btn authenticate-form-button"} onClick={props.submitForm} type={"submit"}>Sign Up</button>
                    </form>
                    <div className={"row authenticate-form-login-link"}>
                        <p>Don't have an account? <Link to="/sign-up">Create Account</Link></p>
                    </div>
                </div>
    )
}

export default LoginForm