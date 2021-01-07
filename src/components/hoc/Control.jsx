import React from "react";
import c from "../Login/Login.module.css";

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div>
            <input {...input} {...props} className={c.loginFormInput + ' ' + (hasError && c.error)}/>
            {hasError && <span className={c.errorMessage}>{meta.error}</span>}
        </div>
    )
}