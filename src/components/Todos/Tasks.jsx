import React from 'react'
import FolderName from "./FolderName/FolderName";
import Tasks from "./Tasks/Tasks";
import IsAddTask from "./IsAddTask/IsAddTask";
import {NavLink} from "react-router-dom";
import c from './Todos.module.css'
import imgLogOut from '../assets/img/Door.png'

let Task = (props) => {
    let idFolder = [...props.location.pathname].slice(1).join('')

    return (
        <div>
            <div className={c.auth}>
                {props.userId === null ? <button><NavLink to={'/login'}>Login</NavLink></button> : <div className={c.outProfile}><span>{props.userName}</span>
                    <img className={c.doorLogOut} src={imgLogOut} alt="Log out" onClick={props.LogOut}/>
                </div>}
            </div>
            <FolderName {...props} idFolder={idFolder}/>
            <Tasks {...props} idFolder={idFolder}/>
            <IsAddTask {...props} idFolder={idFolder}/>
        </div>
    )
}

export default Task