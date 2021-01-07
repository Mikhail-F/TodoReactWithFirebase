import React, {useEffect, useState} from 'react'

import c from "../Folders.module.css";
import InputFormContainer from "./InputFoldersForm.jsx";

let ShowFolders = (props) => {
    
    let [editMode, changeEditMode] = useState(false)
    let [selectColor, changeSelectColor] = useState('#C9D1D3')
    let [selectColorId, changeSelectColorId] = useState(1)

    let setEditMode = (bool) =>{
        changeEditMode(bool)
    }

    let getNewFolder = (value) =>{
        let newText = value.folderName !== undefined ? value.folderName : ''

        props.getAddFolder(newText, selectColor)
        changeEditMode(false)
    }

    let getColors = (color, id) =>{
        changeSelectColor(color)
        changeSelectColorId(id)
    }

    useEffect(() =>{
        changeEditMode(false)
    }, [props.url])

        return (
            <>
                <div>
                    <button onClick={() => setEditMode(true)} className={c.addFolder}>+ Добавть папку</button>
                </div>
                <div className={c.innerShowFolder}>
                    {editMode && <div className={c.showAddFolder}>
                        <InputFormContainer onSubmit={getNewFolder} {...props} getColors={getColors} setEditMode={setEditMode} selectColorId={selectColorId}/>
                    </div>}
                </div>
            </>
        )
}

export default ShowFolders