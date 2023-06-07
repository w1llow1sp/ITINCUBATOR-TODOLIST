import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, todolistsReducer
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}



function AppWithRedux() {
    console.log('App called')

    const dispatch  = useDispatch()

   const todolists =  useSelector<AppRootState, Array<TodolistType>>(state=>state.todolists)
   const tasks =  useSelector<AppRootState, TasksStateType>(state=>state.tasks)


    const  changeFilter = useCallback(
        (value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId,value))
    }, [dispatch]);


    const  removeTodolist = useCallback((id: string)=> {
        dispatch(RemoveTodolistAC(id))},
        [dispatch]);

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(id,title))
    },[dispatch])

    const  addTodolist= useCallback((title: string)=> {
        dispatch(AddTodolistAC(title))
    },[dispatch])


//
    const changeTaskTitle = useCallback(
        (taskId:string,newTitle:string,todolistId:string) => {
            dispatch(changeTaskTitleAC(taskId,newTitle,todolistId))
        },
        [dispatch],
    );
    const removeTask = useCallback(
        (taskId:string,todolistId:string) => {
            dispatch(removeTaskAC(taskId,todolistId))
        },
        [dispatch],
    );

    const changeTaskStatus = useCallback(
        (taskId:string, isDone:boolean, todolistId:string) => {
            dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
        },
        [],
    );





    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;
                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        tasks={tasksForTodolist}
                                        id={tl.id}
                                        title={tl.title}

                                        changeFilter={changeFilter}
                                        filter={tl.filter}

                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        //
                                        changeTaskTitle={changeTaskTitle}
                                        removeTask={removeTask}
                                        changeTaskStatus={changeTaskStatus}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
