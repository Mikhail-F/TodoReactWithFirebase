import c from "../Todos.module.css";
import React from "react";
import {Field, reduxForm} from "redux-form";

let IsAddTaskForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={c.showAddInput}>
            <div><Field component={'input'} type={"text"} name={'newTask'} className={c.inputTextFolder} placeholder={'Текст задачи'}/></div>
            <div className={c.butn}>
                <button className={c.butnAddTask}>Добавть задачу</button>
                <button onClick={props.activeEditMode} className={c.butnDeleteTask}>Отмена</button>
            </div>
        </form>
    )
}

let IsAddTaskFormComponent = reduxForm({
    form: 'addTaskForm'
})(IsAddTaskForm)

export default IsAddTaskFormComponent