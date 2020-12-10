import React from 'react'
import LoginFormContainer from "./LoginForm";
import {NavLink} from "react-router-dom";
import c from './Login.module.css'

let Login = (props) =>{

    let AuthMe = (value) =>{
        props.LoginThunk(value.email, value.password)
    }

    return(
        <div className={c.loginInputs}>
            <div>Логин:</div>
            <div className={c.regForm}><NavLink to={'/registration'}>Регистрация</NavLink></div>
            <LoginFormContainer {...props} onSubmit={AuthMe}/>
            <div className={c.regForm}><NavLink to={'/forgotPassword'}>Забыли пароль ?</NavLink></div>
        </div>
    )
}

export default Login