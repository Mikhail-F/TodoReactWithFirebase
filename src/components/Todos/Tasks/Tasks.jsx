import React, {useEffect, useState} from 'react'
import c from "../Todos.module.css";

let Tasks = (props) => {

    let [newText, changeNewText] = useState('')
    let [taskId, changeTaskId] = useState(null)
    let [taskFolderId, changeTaskFolderId] = useState(null)

    let getNewTaskText = (e) => {
        changeNewText(e.currentTarget.value)
    }

    let changeTaskText = (id, folderId, text) =>{
        if(text.trim() === ''){
            changeTaskId(null)
            changeTaskFolderId(null)
        }
        props.getChangeTaskText(id, folderId, text)
        changeTaskId(null)
        changeTaskFolderId(null)
    }

    let showInputChangeTask = (id, folderId, text) =>{
        changeNewText(text)
        changeTaskId(id)
        changeTaskFolderId(folderId)
    }

    useEffect(() =>{
        changeTaskId(null)
        changeTaskFolderId(null)
    }, [props.idFolder])

    return (
        <div>
            {props.tasks.map(el => {
                return props.idFolder == el.folderId &&
                    <div key={el.id} className={c.taskText}>
                        {el.id == taskId && el.folderId == taskFolderId ?
                            <div className={c.addInput}>
                                <div className={c.inp}><input type="text" onChange={getNewTaskText} value={newText}
                                                              className={c.newTextTask}
                                                              placeholder={'Новый текст задачи'}/></div>
                                <div className={c.butn}><span onClick={() => {
                                    changeTaskText(el.id, el.folderId, newText);
                                }}>&#10004;</span></div>
                            </div>
                            :
                            <div className={c.task}>
                                <div className={c.taskTextInner}>
                                    {el.checked ? <div className={c.checked} onClick={() => {
                                        props.getCheckedTask(el.id);
                                    }}></div> : <div className={c.unChecked} onClick={() => {
                                        props.getCheckedTask(el.id);
                                    }}></div>}
                                    <span className={c.text}>{el.text}</span>
                                </div>
                                <div className={c.add}>
                                    <span
                                        onClick={() => showInputChangeTask(el.id, el.folderId, el.text)}>&#9998;</span>
                                    {el.checked && <button onClick={() => {
                                        props.getDeleteTask(el.id);
                                    }}>X</button>}
                                </div>
                            </div>}
                    </div>
            })}
        </div>
    )
}

export default Tasks