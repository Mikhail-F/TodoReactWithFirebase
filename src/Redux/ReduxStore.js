import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import TodoReducer from "./TodoReducer";
import {reducer as formReducer} from "redux-form";
import AuthReducer from "./authReducer";
import middleWare from "redux-thunk";

let reducers = combineReducers({
    tasksR: TodoReducer,
    form: formReducer,
    authR: AuthReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(middleWare)));

export default store