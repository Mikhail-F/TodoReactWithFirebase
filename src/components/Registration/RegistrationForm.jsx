import React from 'react'
import {Field, reduxForm} from "redux-form";
import c from '../Login/Login.module.css'
import {Input} from "../hoc/Control";
import {maxLength, minLength, required} from "../../Utils/Validators";

let RegistrationForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit} className={c.loginForm}>
            <Field component={Input} name={'email'} validate={[required, minLength, maxLength]}  type={'email'} placeholder={'Введите Email'} className={c.loginFormInput} required/>
            <Field component={Input} name={'password'} validate={[required, minLength, maxLength]}  type={'password'} placeholder={'Введите пароль'} className={c.loginFormInput} required/>
            <Field component={Input} name={'name'} validate={[required, minLength, maxLength]}  type={'text'} placeholder={'Введите Имя'} className={c.loginFormInput} required/>
            <div className={c.buttonInner}><button className={c.buttonLogIn}>Регистрация</button></div>
        </form>
    )
}

let RegistrationFormContainer = reduxForm({
    form: 'Registration'
})(RegistrationForm)

export default RegistrationFormContainer