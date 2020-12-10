import {authUser} from "../components/api/api";
import firebase from "firebase";
import {
    getAllTasks,
    getData,
    getNewFolders,
    getNewRemoveFolderId,
    getNewRemoveTaskId,
    getNewTasks,
    setInitialFoldersAndTasks,
    setUserId
} from "./TodoReducer";

let AUTH = 'AUTH'
let LOGIN = 'LOGIN'
let REGISTRATION = 'REGISTRATION'
let LOG_OUT = 'LOG_OUT'
let SET_IS_FETCHING = 'SET_IS_FETCHING'

let initialState = {
    isAuth: false,
    userId: null,
    userName: null,
    isReg: false,
    user: {email: null, password: null},
    isFetching: false
}

let AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH: {
            return {
                ...state,
                isAuth: true,
                userId: action.uid,
                userName: action.name === null ? state.userName : action.name
            }
        }
        case LOGIN: {
            localStorage.setItem('User', JSON.stringify({email: action.email, password: action.password}))
            return {
                ...state,
                isAuth: true,
                userId: action.uid,
                isReg: false,
                user: {email: action.email, password: action.password}
            }
        }
        case REGISTRATION: {
            localStorage.setItem('User', JSON.stringify({email: action.email, password: action.password}))
            return {
                ...state,
                isReg: true,
                user: {email: action.email, password: action.password},
                userName: action.name,
            }
        }
        case LOG_OUT: {
            localStorage.removeItem('User')
            return {
                ...state,
                isAuth: false,
                userId: null,
                userName: null,
                user: {email: null, password: null}
            }
        }
        case SET_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.bool
            }
        }
        default:
            return state
    }
}

export const firstSetData = (id, obj) => {
    firebase.database().ref(id).set(obj)
}

export const updateData = (id, type, obj) => {
    firebase.database().ref(`${id}/${type}`).set(obj);
}

export const setIsFetching = (bool) => {
    return ({type: SET_IS_FETCHING, bool})
}

export const Auth = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true))
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let uid = user.uid
                let name = user.displayName
                firebase.database().ref(uid).orderByKey().once('value')
                    .then(data => {
                        let dataC = data.val()
                        if(dataC !== null) {
                            dispatch(getNewTasks(dataC.tasks))
                            dispatch(getNewFolders(dataC.folders))
                            dispatch(setUserId(uid))
                            dispatch(getNewRemoveFolderId(dataC.removeFolderId))
                            dispatch(getNewRemoveTaskId(dataC.removeTaskId))
                            dispatch(getAllTasks())
                            dispatch(setIsFetching(false))
                            return dispatch({type: AUTH, uid, name})
                        }
            return LoginThunk()
                    })
            } else {
                return (
                    <>
                        {JSON.parse(localStorage.getItem('User')) !== null
                        &&
                        dispatch(LoginThunk(JSON.parse(localStorage.getItem('User')).email, JSON.parse(localStorage.getItem('User')).password))}
                        {dispatch(setIsFetching(false))}
                    </>
                )
            }
        })
    }
}

export const LoginThunk = (email, password) => {
    return (dispatch) => {
        authUser.login(email, password)
            .then(data => {
                let uid = data.uid
                dispatch({type: LOGIN, uid, email, password})
            })
            .catch(err => {
                if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                    alert('Неверный Email или пароль')
                }
            })
    }
}

export const RegistrationThunk = (email, password, name) => {
    return (dispatch) => {
        authUser.registration(email, password)
            .then(() => {
                firebase.auth().currentUser.updateProfile({displayName: name})
                    .then(() => {
                        firstSetData(firebase.auth().currentUser.uid, getData)
                        dispatch({type: REGISTRATION, email, password, name})
                    })
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    alert('Данный Email уже зарегистрирован')
                }
            })
    }
}

export const LogOut = () => {
    return (dispatch) => {
        authUser.out()
            .then(() => {
                dispatch({type: LOG_OUT})
                dispatch(setInitialFoldersAndTasks())
            })
    }
}

export const ForgotPasswordThunk = (email) => {
    return (dispatch) => {
        authUser.forgetPassword(email)
            .catch(err => {
                if (err.code === 'auth/user-not-found') {
                    alert('Такой Email не зарегистрирован')
                }
            })
    }
}


export default AuthReducer