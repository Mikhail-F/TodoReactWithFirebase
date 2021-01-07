import React from 'react'
import c from './Folders.module.css'
import FoldersName from "./FoldersName/FoldersName";
import ShowFolders from "./ShowFolders/ShowFolders";
import AllTaskBtn from "./AllTaskBtn";

let Folders = (props) => {
    let url = [...props.location.pathname].slice(1).join('')
    return (
        <div className={c.folderPlace}>
            <AllTaskBtn {...props}/>
            <FoldersName {...props} url={url}/>
            <ShowFolders {...props} url={url}/>
        </div>
    )
}

export default Folders