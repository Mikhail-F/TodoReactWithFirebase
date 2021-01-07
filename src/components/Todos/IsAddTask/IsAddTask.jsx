import React, {useEffect, useState} from 'react'
import c from "../Todos.module.css";
import IsAddTaskFormComponent from "./IsAddTaskForm";

let IsAddTask = (props) => {

    let [editMode, changeEditMode] = useState(false)

    let setEditMode = (bool) => {
        changeEditMode(bool)
    }

    let getAddTasks = (value) => {
        let newText = value.newTask !== undefined ? value.newTask : ''
        props.getAddTask(newText, props.idFolder)
        changeEditMode(false)
    }

    useEffect(() => {
        changeEditMode(false)
    }, [props.idFolder])

    return (
        <>
            {props.idFolder !== 'alltask' && props.idFolder !== 'login' && props.idFolder !== 'registration' && props.idFolder !== 'forgotPassword' && props.folders.length !== 0 &&
            <div>
                <button onClick={() => setEditMode(true)} className={c.addTask}>+ Новая Задача</button>
            </div>}

            <>{editMode && <IsAddTaskFormComponent onSubmit={getAddTasks} setEditMode={setEditMode}/>}</>
        </>
    )
}


export default IsAddTask