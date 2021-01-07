import React from "react";
import c from "./Folders.module.css";
import {NavLink} from "react-router-dom";

const AllTaskBtn = (props) => {
    return (
        <div className={c.allTask}>
            <div className={c.allLeft}>
                <div className={c.allLLeft}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={c.allLRight}>
                    <div></div>
                    <div className={c.allLRightCenter}></div>
                    <div></div>
                </div>
            </div>
            <NavLink to={'/alltask'} onClick={props.removeCheckedFolder}>Все Задачи</NavLink>
        </div>
    );
}

export default AllTaskBtn