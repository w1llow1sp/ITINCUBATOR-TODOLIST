import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC} from "./state/tasks-reducer";
import {AppRootState} from "./state/store";
import {Task} from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks:Array<TaskType>

    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType

    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    //
    removeTask:(taskId:string,todolistId:string) => void
    changeTaskStatus: (taskId:string,isDone:boolean,todolistId:string) =>void
    changeTaskTitle:(taskId:string,newTitle:string,todolistId:string) =>void
}

export const Todolist =  React.memo( function (props: PropsType) {
    console.log('Todolist is called')

    const dispatch  = useDispatch()
    const tasks =  useSelector<AppRootState, Array<TaskType>>(
        state=>state.tasks[props.id])

    // add useCallback

    const addTask = useCallback((title:string)=> {
            dispatch(addTaskAC(title,props.id))},
        [dispatch]);

    const  removeTodolist =  useCallback (() => {
        props.removeTodolist(props.id)
        },[props.removeTodolist,props.id ])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    },[props.changeTodolistTitle,props.id])



    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props.changeFilter,props.id]) ;
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props.changeFilter,props.id]) ;
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props.changeFilter,props.id]) ;


    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return<div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t =>
                    <Task
                    task={t}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                    removeTask={props.removeTask}
                    todolistId={props.id}
                    key={t.id}
                    />)
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


