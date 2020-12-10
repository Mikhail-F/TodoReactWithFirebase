import React from 'react'
import {Field, reduxForm} from "redux-form";
import c from './Login.module.css'

let LoginForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit} className={c.loginForm}>
            <Field component={'input'} name={'email'} type={'email'} placeholder={'Введите Email'} className={c.loginFormInput} required/>
            <Field component={'input'} name={'password'} type={'password'} placeholder={'Введите Password'} className={c.loginFormInput} required/>
            <div className={c.buttonInner}><button className={c.buttonLogIn}>Войти</button></div>
        </form>
    )
}

let LoginFormContainer = reduxForm({
    form: 'Login'
})(LoginForm)

export default LoginFormContainer