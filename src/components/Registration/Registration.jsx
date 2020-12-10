import React from 'react'
import RegistrationFormContainer from "./RegistrationForm";
import c from "../Login/Login.module.css";

let Registration = (props) =>{

    let Registr = (value) =>{
        props.RegistrationThunk(value.email, value.password, value.name)
    }

    return(
        <div className={c.loginInputs}>
            <div>Регистрация:</div>
            <RegistrationFormContainer {...props} onSubmit={Registr}/>
        </div>
    )
}

export default Registration