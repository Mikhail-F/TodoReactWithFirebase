import React, {useEffect} from 'react'
import AllTask from "./AllTask";
import {connect} from "react-redux";
import {getAllTasks} from "../../Redux/TodoReducer";

// class AllTaskAPIComponent extends React.PureComponent{
//
//     componentDidMount() {
//         this.props.getAllTasks()
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//             if(this.props.isAuth === false && prevProps.tasks !== this.props.tasks) {
//                 this.props.getAllTasks()
//             }
//     }
//
//     render() {
//         return(
//             <AllTask {...this.props}/>
//         )
//     }
// }

const AllTaskAPIComponent = (props) =>{

    useEffect(() =>{
        props.getAllTasks()
    },[])

    useEffect(() =>{
        props.getAllTasks()
    }, [props.folders, props.isAuth])

    return(
            <AllTask {...props}/>
        )
}

let mapStateToProps = (state)=>{
    return{
        all: state.tasksR.all,
        folders: state.tasksR.folders,
        isAuth: state.authR.isAuth
    }
}

let AllTaskComponent = connect(mapStateToProps, {getAllTasks})(AllTaskAPIComponent)

export default AllTaskComponent