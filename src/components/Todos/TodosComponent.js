import React from 'react'
import {connect} from "react-redux";
import Task from "./Tasks";
import {withRouter} from "react-router-dom";
import {
    getAddTask,
    getChangeFolderName,
    getChangeTaskText,
    getCheckedTask,
    getDeleteTask,
    getIsChangeFolderName,
    getNewFolderName,
} from "../../Redux/TodoReducer";
import {compose} from "redux";
import {LogOut} from "../../Redux/authReducer";


function TaskAPIComponent(props) {
    return (
        <Task {...props}/>
    )
}

let mapStateToProps = (state)=>{
    return{
        tasks: state.tasksR.tasks,
        newFolderName: state.tasksR.newFolderName,
        isChangeFolderName: state.tasksR.isChangeFolderName,
        folders: state.tasksR.folders,
        newTaskText: state.tasksR.newTaskText,
        userName: state.authR.userName,
        userId: state.authR.userId,
    }
}

let TaskComponent = compose(
    connect(mapStateToProps, {LogOut, getCheckedTask, getAddTask, getNewFolderName, getChangeFolderName, getIsChangeFolderName,getChangeTaskText, getDeleteTask}),
    withRouter
)(TaskAPIComponent)

export default TaskComponent