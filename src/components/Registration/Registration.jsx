import React from 'react'
import RegistrationFormContainer from "./RegistrationForm";
import c from "../Login/Login.module.css";
import {NavLink} from "react-router-dom";

let Registration = (props) =>{

    let Registr = (value) =>{
        props.RegistrationThunk(value.email, value.password, value.name)
    }

    return(
        <div className={c.loginInputs}>
            <NavLink to={'/login'}>Назад</NavLink>
            <div>Регистрация:</div>
            <RegistrationFormContainer {...props} onSubmit={Registr}/>
        </div>
    )
}

export default Registration