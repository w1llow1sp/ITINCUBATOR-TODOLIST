import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemovedTodolistActionType = {
    type:'REMOVE-TODOLIST'
    id:string
}
export type AddTodolistActionType = {
    type:'ADD-TODOLIST'
    title:string
}
export type ChangeTodolistActionType = {
    type:'CHANGE-TODOLIST-TITLE'
    id:string
    title:string
}
export type ChangeTodolistFilterActionType = {
    type:'CHANGE-TODOLIST-FILTER'
    id:string
    filter:FilterValuesType
}

type ActionType =
    RemovedTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilterActionType


export const todolistsReducer = (state:Array<TodolistType>,action:ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            let newState = [...state];
            return newState.filter((tl) => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodolist = {
                id:v1(),
                title:action.title,
                filter:'all'
            }
            return [...state,newTodolist];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl) => {
                if (tl.id === action.id) {
                    return { ...tl, title: action.title }
                }
                return tl
            })
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(tl=> {
                if(tl.id === action.id){
                    return{...tl, filter: action.filter}
                }
                return tl
            })
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistID:string): RemovedTodolistActionType => {
    return {type:'REMOVE-TODOLIST',id:todolistID}
}

export const AddTodolistAC = (TITLE:string): AddTodolistActionType => {
    return { type:'ADD-TODOLIST', title:TITLE}
}

export const ChangeTodolistTitleAC = (ID:string, TITLE:string): ChangeTodolistActionType => {
    return {type:'CHANGE-TODOLIST-TITLE', id:ID, title:TITLE }
}

export const ChangeTodolistFilterAC = (ID:string, FILTER:FilterValuesType): ChangeTodolistFilterActionType => {
    return {type:'CHANGE-TODOLIST-FILTER',id:ID, filter:FILTER }
}

