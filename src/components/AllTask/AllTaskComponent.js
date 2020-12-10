import React from 'react'
import AllTask from "./AllTask";
import {connect} from "react-redux";
import {getAllTasks} from "../../Redux/TodoReducer";

class AllTaskAPIComponent extends React.PureComponent{

    componentDidMount() {
        this.props.getAllTasks()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
            if(this.props.isAuth === false && prevProps.tasks !== this.props.tasks) {
                this.props.getAllTasks()
            }
    }

    render() {
        return(
            <AllTask {...this.props}/>
        )
    }
}

let mapStateToProps = (state)=>{
    return{
        all: state.tasksR.all,
        tasks: state.tasksR.tasks,
        isAuth: state.authR.isAuth
    }
}

let AllTaskComponent = connect(mapStateToProps, {getAllTasks})(AllTaskAPIComponent)

export default AllTaskComponent