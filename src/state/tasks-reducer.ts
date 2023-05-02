import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type removeTaskActionType = {
    type: 'REMOVE-TASK',
    taskID: string,
    todolistID: string

}

export type addTaskActionType = {
    type : 'ADD-TASK'
    title: string
    todolistId: string
}

export type changeTaskActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistId: string
}

export type changeTaskTitleActionType ={
    type : 'CHANGE-TASK-TITLE'
    taskID: string
    newTitle: string
    todolistId: string
}

type ActionsType =
    removeTaskActionType |
    addTaskActionType |
    changeTaskActionType |
    changeTaskTitleActionType|
    AddTodolistActionType|
    RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state,
            [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]:[
                    ...state[action.todolistId],newTask]
            }
        case "CHANGE-TASK-STATUS":
            return  {
                ...state,
                [action.todolistId]:state[action.todolistId].map(
                    t=> t.id === action.taskID
                        ? {...t,isDone : action.isDone}
                        : t)

            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].map(
                    t=> t.id === action.taskID
                        ? {...t,title:action.newTitle}
                        : t
                )
            }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
            /*
        const {[action.id]:[],...rest}= state
            return rest
*/
        }

        default:
            throw new Error("I don't understand this type")
    }

}

export const removeTaskAC = (taskID: string, todolistID: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todolistID}
}

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return  {type:'ADD-TASK',title,todolistId}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) : changeTaskActionType=> {
    return  {type:'CHANGE-TASK-STATUS', taskID,isDone,todolistId}
}

export const changeTaskTitleAC = ( taskID: string, newTitle: string, todolistId: string) : changeTaskTitleActionType => {
    return  {type:'CHANGE-TASK-TITLE',taskID,newTitle,todolistId}
}

export const addTodolistAC = (title:string ):AddTodolistActionType => {
    return {type:'ADD-TODOLIST', title,todolistId: v1()}
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}