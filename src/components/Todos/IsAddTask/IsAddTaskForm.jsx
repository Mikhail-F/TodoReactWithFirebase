import c from "../Todos.module.css";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../hoc/Control";
import {maxLength, required} from "../../../Utils/Validators";

let IsAddTaskForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={c.showAddInput}>
            <div><Field component={Input} type={"text"} validate={[required, maxLength]} name={'newTask'} className={c.inputTextFolder} placeholder={'Текст задачи'}/></div>
            <div className={c.butn}>
                <button className={c.butnAddTask}>Добавть задачу</button>
                <button onClick={() => props.setEditMode(false)} className={c.butnDeleteTask}>Отмена</button>
            </div>
        </form>
    )
}

let IsAddTaskFormComponent = reduxForm({
    form: 'addTaskForm'
})(IsAddTaskForm)

export default IsAddTaskFormComponent