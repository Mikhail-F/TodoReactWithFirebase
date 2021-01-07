import React from 'react'
import c from './AllTask.module.css'

let AllTask = (props) => {
    return (
        props.all.length != 0 ? props.all.map(el => {
            return <div key={el.id}>
                <div className={c.title} style={{color: el.color}}>{el.title}</div>
                <div className={c.task}>{el.tasks.length !== 0 && el.tasks.map(task => <div key={task.id} className={c.taskTextInner}>
                    {task.checked ? <div className={c.checked}></div> :
                        <div className={c.unChecked}></div>}{task.text}</div>)}</div>
            </div>
        }) : <div className={c.taskEmpty}>
            <div className={c.innerTaskEmpty}>Задачи отсутствуют</div>
        </div>
    )
}

export default AllTask