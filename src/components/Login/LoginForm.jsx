import React from 'react'
import {Field, reduxForm} from "redux-form";
import c from './Login.module.css'
import {maxLength, minLength, required} from "../../Utils/Validators";
import {Input} from "../hoc/Control";

let LoginForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit} className={c.loginForm}>
            <Field component={Input} validate={[required, minLength, maxLength]} name={'email'} type={'email'} placeholder={'Введите Email'}/>
            <Field component={Input} validate={[required, minLength, maxLength]} name={'password'} type={'password'} placeholder={'Введите Password'}/>
            <div className={c.buttonInner}><button className={c.buttonLogIn}>Войти</button></div>
        </form>
    )
}

let LoginFormContainer = reduxForm({
    form: 'Login'
})(LoginForm)

export default LoginFormContainer