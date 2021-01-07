import React from 'react'
import c from "../Folders.module.css";
import {NavLink} from "react-router-dom";

let FoldersName = (props) => {
    return (
        <div className={c.folders}>
            {props.folders.map((el, i) => {
                return (
                    <div key={el.id} className={props.url == el.id ? c.activeFolder : c.linkFolder}>
                        <div className={c.folderText}>
                            <div className={c.changePlace}>
                                {i !== 0 && <span onClick={() => props.setChangePlaceFolder('up', el.id)}>&uarr;</span>}
                                {i !== props.folders.length-1 && <span onClick={() => props.setChangePlaceFolder('down', el.id)}>&darr;</span>}
                            </div>
                            <NavLink to={`/${el.id}`} className={c.folder} onClick={() => props.getCheckedFolder(el.id)}>
                                <div className={c.circleFolder} style={{background: el.color}}></div>
                                <div className={c.nameFolder}>{el.name}</div>
                            </NavLink>
                        </div>
                        {el.id == props.checkedFolder && <NavLink to={'/alltask'} className={c.removeFolder}
                                                                  onClick={() =>props.deleteFolder(el.id)}>X</NavLink>}
                    </div>
                )
            })}
        </div>
    )
}

export default FoldersName