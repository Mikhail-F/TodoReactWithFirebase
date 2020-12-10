import React from 'react'
import {Field, reduxForm} from "redux-form";
import c from '../Login/Login.module.css'

let RegistrationForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit} className={c.loginForm}>
            <Field component={'input'} name={'email'} type={'email'} placeholder={'Введите Email'} className={c.loginFormInput} required/>
            <Field component={'input'} name={'password'} type={'password'} placeholder={'Введите пароль'} className={c.loginFormInput} required/>
            <Field component={'input'} name={'name'} type={'text'} placeholder={'Введите Имя'} className={c.loginFormInput} required/>
            <div className={c.buttonInner}><button className={c.buttonLogIn}>Регистрация</button></div>
        </form>
    )
}

let RegistrationFormContainer = reduxForm({
    form: 'Registration'
})(RegistrationForm)

export default RegistrationFormContainer