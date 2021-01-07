import React from 'react'
import {Field, reduxForm} from "redux-form";
import c from "../Folders.module.css";
import {maxLength, required} from "../../../Utils/Validators";
import {Input} from "../../hoc/Control";

let InputForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Input} validate={[required, maxLength]} type={'text'} name={'folderName'} placeholder={'Название папки'} />
            <div className={c.circles}>{props.colors.map(el => {
                   return (
                       <div key={el.id} className={el.id == props.selectColorId ? c.circleActive : c.circle}
                         style={{background: el.color}}
                         onClick={() => props.getColors(el.color, el.id)}></div>
                   )
            })}</div>
            <div>
                <button className={c.btnAddFolder}>Добавить</button>
                <button className={c.closeAddFolder} onClick={() => props.setEditMode(false)}>X</button>
            </div>
        </form>
    )
}

let InputFormContainer = reduxForm({
    form: 'foldersForm'
})(InputForm)

export default InputFormContainer