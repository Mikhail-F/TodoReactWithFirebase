// Папки
import {updateData} from "./authReducer";

let NEW_FOLDER = 'NEW_FOLDER'
let DELETE_FOLDER = 'DELETE_FOLDER'
let NEW_FOLDER_NAME = 'NEW_FOLDER_NAME'
let CHANGE_FOLDER_NAME = 'CHANGE_FOLDER_NAME'
let IS_CHANGE_FOLDER_NAME = 'IS_CHANGE_FOLDER_NAME'
let CHECKED_FOLDER = 'CHECKED_FOLDER'
let REMOVE_CHECKED_FOLDER = 'REMOVE_CHECKED_FOLDER'

// Задачи
let NEW_TASK = 'NEW_TASK'
let IS_CHECKED_TASK = 'IS_CHECKED_TASK'
let CHANGE_TASK_TEXT = 'CHANGE_TASK_TEXT'
let DELETE_TASK = 'DELETE_TASK'

// Отправка данных серверу
let GET_NEW_FOLDER = 'GET_NEW_FOLDER'
let GET_NEW_TASKS = 'GET_NEW_TASKS'
let SET_USER_ID = 'SET_USER_ID'
let GET_NEW_REMOVE_FOLDER_ID = 'GET_NEW_REMOVE_FOLDER_ID'
let GET_NEW_REMOVE_TASK_ID = 'GET_NEW_REMOVE_TASK_ID'

// Возврат исходных задач и папок при выходе из аккаунта
let SET_INITIAL_FOLDERS_AND_TASKS = 'SET_INITIAL_FOLDERS_AND_TASKS'

//Все задачи
let ALL_TASKS = 'ALL_TASKS'

// Перемещение папок
let CHANGE_PlACE_FOLDER = 'CHANGE_PlACE_FOLDER'

let initialState = {

    userId: null,

    folders: [
        {id: 1, color: '#42B883', name: 'Покупки'},
        {id: 2, color: '#64C4ED', name: 'Фронтенд'},
        {id: 3, color: '#FFBBCC', name: 'Фильмы и сериалы'},
        {id: 4, color: '#B6E6BD', name: 'Книги'},
        {id: 5, color: '#C9D1D3', name: 'Личное'},
    ],

    newFolderName: '',
    isChangeFolderName: false,

    checkedFolder: null,

    tasks: [
        {id: 1, folderId: 1, checked: false, text: 'Макарошки'},
        {id: 2, folderId: 1, checked: false, text: 'Картошку'},
        {id: 3, folderId: 1, checked: false, text: 'Биткоины'},
        {id: 4, folderId: 2, checked: false, text: 'Изучить JS'},
        {id: 5, folderId: 2, checked: false, text: 'Изучить паттерны проектирования'},
        {id: 6, folderId: 2, checked: false, text: 'ReactJS Hooks (useState, useReducer, useEffect и т.д.)'},
        {id: 7, folderId: 2, checked: false, text: 'Redux (redux-observable, redux-saga)'},
        {id: 8, folderId: 3, checked: false, text: 'Макарошки'},
        {id: 9, folderId: 3, checked: false, text: 'Картошку'},
        {id: 10, folderId: 3, checked: false, text: 'Биткоины'},
        {id: 11, folderId: 4, checked: false, text: 'Макарошки'},
        {id: 12, folderId: 4, checked: false, text: 'Картошку'},
        {id: 13, folderId: 4, checked: false, text: 'Биткоины'},
    ],
    removeTaskId: [],

    taskId: null,
    taskFolderId: null,
    removeFolderId: [],

    all: [],

    colors: [
        {id: 1, color: '#C9D1D3'},
        {id: 2, color: '#42B883'},
        {id: 3, color: '#64C4ED'},
        {id: 4, color: '#FFBBCC'},
        {id: 5, color: '#B6E6BD'},
        {id: 6, color: '#C355F5'},
        {id: 7, color: '#09011A'},
        {id: 8, color: '#FF6464'},
    ]
}

let TodoReducer = (state = initialState, action) => {
    switch (action.type) {

        //Папки
        case NEW_FOLDER: {
            if (action.text.trim() === '') {
                return state
            }

            let count = state.folders.length

            let newFolder = {
                id: state.removeFolderId.length != 0 ? state.removeFolderId[0] : ++count,
                name: action.text,
                color: action.selectColor
            }

            let rfID = state.removeFolderId.length != 0 ? state.removeFolderId.filter(el => el !== newFolder.id) : []

            if(state.userId !== null){
                updateData(state.userId, 'folders', [...state.folders, newFolder])
                updateData(state.userId, 'removeFolderId', rfID)
            }
            return {
                ...state,
                folders: [...state.folders, newFolder],
                removeFolderId: rfID
            }
        }
        case IS_CHANGE_FOLDER_NAME: {
            return {
                ...state,
                newFolderName: action.name,
                isChangeFolderName: !state.isChangeFolderName,
            }
        }
        case NEW_FOLDER_NAME: {
            return {
                ...state,
                newFolderName: action.text
            }
        }
        case CHANGE_FOLDER_NAME: {
            if(state.newFolderName.trim() === ''){
                return {
                    ...state,
                    isChangeFolderName: false
                }
            }

            let changeFN = state.folders.map(el => el.id == action.id ? {
                id: action.id,
                name: state.newFolderName,
                color: action.color
            } : el)

            if(state.userId !== null){
                updateData(state.userId, 'folders', changeFN)
            }
            return {
                ...state,
                folders: changeFN,
                newFolderName: '',
                isChangeFolderName: false
            }
        }
        case CHECKED_FOLDER: {
            return {
                ...state,
                checkedFolder: action.checked,
                isChangeFolderName: false,
                taskFolderId: null,
                isAddTask: false,
            }
        }
        case REMOVE_CHECKED_FOLDER: {
            return {
                ...state,
                checkedFolder: null
            }
        }
        case DELETE_FOLDER: {
            let removeFolderId = action.id
            let newFolder = state.folders.filter(el => el.id != removeFolderId)
            let newTask = state.tasks.filter(el => el.folderId != removeFolderId)

            let rfID = [...state.removeFolderId, removeFolderId]

            if(state.userId !== null){
                updateData(state.userId, 'folders', newFolder)
                updateData(state.userId, 'tasks', newTask)
                updateData(state.userId, 'removeFolderId', rfID)
            }
            return {
                ...state,
                folders: newFolder,
                tasks: newTask,
                removeFolderId: rfID,
            }
        }

        // Задачи
        case NEW_TASK: {
            if (action.text.trim() === '') {
                return state
            }

            let count = state.removeTaskId.length !== 0 ? state.removeTaskId[0] : state.tasks.length + 1

            let task = {
                id: count,
                folderId: action.idFolder,
                text: action.text
            }

            let rtId = state.removeTaskId.length !== 0 ? state.removeTaskId.filter(el => el != task.id) : []

            if(state.userId !== null){
                updateData(state.userId, 'tasks', [...state.tasks, task])
                updateData(state.userId, 'removeTaskId', rtId)
            }
            return {
                ...state,
                tasks: [...state.tasks, task],
                isAddTask: false,
                removeTaskId: rtId
            }
        }
        case CHANGE_TASK_TEXT: {
            let changeTT = state.tasks.map(el => el.folderId == action.folderId && el.id == action.id ? {
                ...el,
                text: action.text
            } : el)

            if(state.userId !== null){
                updateData(state.userId, 'tasks', changeTT)
            }
            return {
                ...state,
                tasks: changeTT,
                taskFolderId: null,
            }
        }
        case IS_CHECKED_TASK: {
            let check = state.tasks.map(el => el.id == action.id ? {
                id: el.id,
                folderId: el.folderId,
                checked: !el.checked,
                text: el.text
            } : el)

            if(state.userId !== null){
                updateData(state.userId, 'tasks', check)
            }
            return {
                ...state,
                tasks: check
            }
        }
        case DELETE_TASK: {
            let newTasks = state.tasks.filter((el => el.id !== action.id))

            if(state.userId !== null){
                updateData(state.userId, 'tasks', newTasks)
                updateData(state.userId, 'removeTaskId', [...state.removeTaskId, action.id])
            }

            return {
                ...state,
                tasks: newTasks,
                removeTaskId: [...state.removeTaskId, action.id]
            }
        }

        // Все задачи
        case ALL_TASKS: {
            let mas = []
            let localTasks = state.tasks
            let localFolders = state.folders

            for (let i = 0; i < localFolders.length; i++) {
                let item = {
                    id: mas.length + 1,
                    title: '',
                    tasks: [],
                    color: ''
                }
                let folderTitle = localFolders[i]

                item.title = folderTitle.name
                item.color = folderTitle.color
                if (localTasks.length != 1) {
                    for (let k = 0; k < localTasks.length; k++) {
                        let task = localTasks[k]
                        if (task.folderId == folderTitle.id) {
                            item.tasks.push({id: task.id, checked: task.checked, text: task.text})
                        }
                    }
                } else {
                    let task = localTasks[0]
                    if (task.folderId == folderTitle.id) {
                        item.tasks.push({id: task.id, checked: task.checked, text: task.text})
                    }
                }
                mas.push(item)
            }
            return {
                ...state,
                all: [...mas]
            }
        }

        // Восстановление стандартных параметров
        case SET_INITIAL_FOLDERS_AND_TASKS:{
            return {
                ...state,
                folders: initialState.folders,
                tasks: initialState.tasks,
                removeTaskId: initialState.removeTaskId,
                removeFolderId: initialState.removeFolderId,
                userId: initialState.userId
            }
        }

        // Перемещение папок
        case CHANGE_PlACE_FOLDER:{
            let folders = [...state.folders]
            let id
            let newFolders = []
            folders.forEach((el, i) =>{
                if(action.id === el.id){
                    id = i
                }
            })

            if(action.way === 'up'){
                [folders[id-1], folders[id]] = [folders[id], folders[id-1]]
                folders.forEach((el, num) =>{
                    if(num !== id || num !== id-1){
                        newFolders.push(el)
                    }
                })

            }
            else if (action.way === 'down'){
                [folders[id+1], folders[id]] = [folders[id], folders[id+1]]
                folders.forEach((el, num) =>{
                    if(num !== id || num !== id+1){
                        newFolders.push(el)
                    }
                })
            }
            updateData(state.userId, 'folders', newFolders)
            return {
                ...state,
                folders: newFolders
            }
        }

        // Отправка данных серверу
        case GET_NEW_FOLDER: {
            let item = action.dataC === undefined ? [] : action.dataC
            return {
                ...state,
                folders: item,
            }
        }
        case GET_NEW_TASKS: {
            let item = action.dataC === undefined ? [] : action.dataC
            return {
                ...state,
                tasks: item,
            }
        }
        case SET_USER_ID:{
            return {
                ...state,
                userId: action.id
            }
        }
        case GET_NEW_REMOVE_FOLDER_ID:{
            let rfId = action.dataC === undefined ? [] : action.dataC
            return {
                ...state,
                removeFolderId: rfId
            }
        }
        case GET_NEW_REMOVE_TASK_ID:{
            let rtId = action.dataC === undefined ? [] : action.dataC
            return {
                ...state,
                removeTaskId: rtId
            }
        }

        default: {
            return state
        }
    }
}

// Папки
export let getAddFolder = (text, selectColor) => {
    return ({type: NEW_FOLDER, text, selectColor})
}
export let deleteFolder = (id) => {
    return ({type: DELETE_FOLDER, id})
}
export let getNewFolderName = (text) => {
    return ({type: NEW_FOLDER_NAME, text})
}
export let getChangeFolderName = (id, color) => {
    return ({type: CHANGE_FOLDER_NAME, id, color})
}
export let getIsChangeFolderName = (name) => {
    return ({type: IS_CHANGE_FOLDER_NAME, name})
}
export let getCheckedFolder = (checked) => {
    return ({type: CHECKED_FOLDER, checked})
}
export let removeCheckedFolder = () => {
    return ({type: REMOVE_CHECKED_FOLDER})
}

// Задачи
export let getAddTask = (text, idFolder) => {
    return ({type: NEW_TASK, text, idFolder})
}
export let getCheckedTask = (id) => {
    return ({type: IS_CHECKED_TASK, id})
}
export let getChangeTaskText = (id, folderId, text) => {
    return ({type: CHANGE_TASK_TEXT, id, folderId, text})
}
export let getDeleteTask = (id) => {
    return ({type: DELETE_TASK, id})
}

// Все задачи
export let getAllTasks = () => {
    return ({type: ALL_TASKS})
}
export const setUserId = (id) =>{
    return ({type: SET_USER_ID, id})
}

// Восстановление стандартных параметров
export let setInitialFoldersAndTasks = () =>{
    return ({type: SET_INITIAL_FOLDERS_AND_TASKS})
}

// Перемещение папок
export let setChangePlaceFolder = (way, id) =>{
    return ({type: CHANGE_PlACE_FOLDER, way, id})
}

// Отправка данных серверу
export let getNewFolders = (dataC) =>{
    return ({type: GET_NEW_FOLDER, dataC})
}
export let getNewTasks = (dataC) =>{
    return ({type: GET_NEW_TASKS, dataC})
}
export let getNewRemoveFolderId = (dataC) =>{
    return ({type: GET_NEW_REMOVE_FOLDER_ID, dataC})
}
export let getNewRemoveTaskId = (dataC) =>{
    return ({type: GET_NEW_REMOVE_TASK_ID, dataC})
}

// Отправка данных в authReducer
export let getData = {
        folders: initialState.folders,
        tasks: initialState.tasks
}

export default TodoReducer