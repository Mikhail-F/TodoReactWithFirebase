import React from 'react'
import {Field, reduxForm} from "redux-form";
import c from "../Folders.module.css";

let InputForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={'input'} type={'text'} name={'folderName'} placeholder={'Название папки'} />
            <div className={c.circles}>{props.colors.map(el => {
                   return (
                       <div key={el.id} className={el.id == props.selectColorId ? c.circleActive : c.circle}
                         style={{background: el.color}}
                         onClick={() => props.getColors(el.color, el.id)}></div>
                   )
            })}</div>
            <div>
                <button className={c.btnAddFolder}>Добавить</button>
                <button className={c.closeAddFolder} onClick={props.activeEditMode}>X</button>
            </div>
        </form>
    )
}

let InputFormContainer = reduxForm({
    form: 'foldersForm'
})(InputForm)

export default InputFormContainer