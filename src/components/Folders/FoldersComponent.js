import React from 'react'
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Folders from "./Folders";
import {
    deleteFolder,
    getAddFolder,
    getCheckedFolder,
    removeCheckedFolder,
    setChangePlaceFolder
} from "../../Redux/TodoReducer";

function FoldersAPIComponent(props) {
    return (
        <Folders {...props}/>
    )
}

let mapStateToProps = (state)=>{
    return{
        folders: state.tasksR.folders,
        checkedFolder: state.tasksR.checkedFolder,
        colors: state.tasksR.colors,
        tasks: state.tasksR.tasks,
    }
}

let FoldersComponent = compose(
    connect(mapStateToProps, {getAddFolder, getCheckedFolder, removeCheckedFolder,deleteFolder, setChangePlaceFolder}),
    withRouter,
)(FoldersAPIComponent)

export default FoldersComponent