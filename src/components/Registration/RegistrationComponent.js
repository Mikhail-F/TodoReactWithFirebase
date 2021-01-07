import React from 'react'
import {connect} from "react-redux";
import Registration from "./Registration";
import {RegistrationThunk} from "../../Redux/authReducer";
import {Redirect} from "react-router-dom";

const RegistrationComponent = (props) => {
    return (
        !props.isReg ? <Registration {...props}/> : <Redirect to={'/login'}/>
    )
}

let mapStateToProps = (state) => {
    return {isReg: state.authR.isReg}
}

export default connect(mapStateToProps, {RegistrationThunk})(RegistrationComponent)