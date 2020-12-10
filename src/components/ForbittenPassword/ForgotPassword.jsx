import React from 'react'
import ForgotPasswordFormContainer from "./ForgotPasswordFormContainer";

let ForgotPassword = (props) =>{

    let ForgotMe = (value) =>{
        props.ForgotPasswordThunk(value.email)
    }

    return(
        <div>
            <div>Восстановление пароля:</div>
            <ForgotPasswordFormContainer {...props} onSubmit={ForgotMe} />
        </div>
    )
}

export default ForgotPassword