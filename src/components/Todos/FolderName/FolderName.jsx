import React from 'react'
import c from "./FolderName.module.css";

let FolderName = (props) =>{

    let getNewFolderName = (e) => {
        props.getNewFolderName(e.target.value)
    }

    return (
        <div>
            {props.folders.map(el => {
                return el.id == props.idFolder ?
                    props.isChangeFolderName ? <div className={c.addInput} key={el.id}>
                            <div><input type="text" onChange={getNewFolderName} value={props.newFolderName}/></div>
                            <span onClick={() => props.getChangeFolderName(props.idFolder, el.color)}>&#10004;</span>
                        </div>
                        :
                        <div key={el.id} className={c.folderName} style={{color: el.color}}>{el.name}
                            <span onClick={() => props.getIsChangeFolderName(el.name)} className={c.folderSpan}>&#9998;</span>
                        </div>
                    : null
            })}
        </div>
    )
}

export default FolderName