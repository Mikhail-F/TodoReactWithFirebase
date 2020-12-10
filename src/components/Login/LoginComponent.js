import React from 'react'
import {connect} from "react-redux";
import Login from "./Login";
import {LoginThunk} from "../../Redux/authReducer";
import {Redirect} from "react-router-dom";

const LoginComponent = (props) => {
    return (
        props.isAuth ? <Redirect to={'/alltask'}/> : <Login {...props}/>
    )
}

let mapStateToProps = (state) =>{
    return {
        isAuth: state.authR.isAuth
    }
}

export default connect(mapStateToProps, {LoginThunk})(LoginComponent)