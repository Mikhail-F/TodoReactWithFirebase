import React from 'react'
import ForgotPassword from "./ForgotPassword";
import {connect} from "react-redux";
import {ForgotPasswordThunk} from "../../Redux/authReducer";
import c from "../Login/Login.module.css";

function ForgotPasswordComponent(props) {
    return (
        <div className={c.loginInputs}>
            <ForgotPassword {...props}/>
        </div>
    );
}

export default connect(null, {ForgotPasswordThunk})(ForgotPasswordComponent)