import './App.css';

import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

import {Auth} from "./Redux/authReducer";

import FoldersComponent from "./components/Folders/FoldersComponent";
import TaskComponent from "./components/Todos/TodosComponent";
import AllTaskComponent from "./components/AllTask/AllTaskComponent";
import Preloader from "./components/assets/Preloader/Preloader";
import WithSuspense from "./components/hoc/WithSunpense";

const LoginComponent = React.lazy(() => import('./components/Login/LoginComponent'))
const RegistrationComponent = React.lazy(() => import("./components/Registration/RegistrationComponent"))
const ForgotPasswordComponent = React.lazy(() => import("./components/ForbittenPassword/ForgotPasswordComponent"))

class App extends React.PureComponent {

    componentDidMount() {
        !this.props.isReg && this.props.Auth()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isAuth !== this.props.isAuth){
            this.props.Auth()
        }
    }

    render() {
        return (
            <>
                {!this.props.isFetching || JSON.parse(localStorage.getItem('User')) === null ? null : <div></div>}
                <div className="App">
                    <FoldersComponent/>
                    <div className="tasks">
                        <Route path={'/'} render={() => <TaskComponent/>}/>
                        <Route path={'/alltask'} render={() => <AllTaskComponent/>}/>
                        <Route path={'/login'} render={WithSuspense(LoginComponent)}/>
                        <Route path={'/registration'} render={WithSuspense(RegistrationComponent)}/>
                        <Route path={'/forgotPassword'} render={WithSuspense(ForgotPasswordComponent)}/>
                        <Redirect from='/' to='/alltask'/>
                    </div>
                </div>
            </>
            );
    }
}

let mapStateToProps = (state) =>{
    return {
        isFetching: state.authR.isFetching,
        isAuth: state.authR.isAuth,
        isReg: state.authR.isReg
    }
}

export default connect(mapStateToProps, {Auth})(App)
