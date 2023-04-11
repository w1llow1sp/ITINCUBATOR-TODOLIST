import React, {ChangeEvent,  FC} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {CheckBox} from "@mui/icons-material";


// rsc

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string,todolistId:string) => void
    changeTodoListFilter: (filter: FilterValuesType,todolistId:string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean,todolistId:string) => void
    addTask: (title: string,todolistId:string) => void
    todolistId:string
    removeTodolist:(todolistId:string)=>void
    changeTaskTitle:(taskId: string, newTitle: string,todolistId:string)=>void
    changeTodoListTitle:( newTodoTitle: string,todolistId:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    let isAllTasksNotIsDone = true // все не выполенные
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"


    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id,props.todolistId
        )
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked,props.todolistId)
        const changeTaskTitle = (newTitle:string)=>props.changeTaskTitle(task.id,newTitle,props.todolistId)
        return (
            <ListItem key={task.id}
                      divider
            disablePadding
            secondaryAction={
                <IconButton
                    size={'small'}
                    onClick={removeTaskHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            }>
                <Checkbox
                    edge={'start'}
                    color={'secondary'}
                    size={'small'}
                    onChange={changeTaskStatus}
                    checked={task.isDone}
                />
                <EditableSpan title={task.title}
                              classes={task.isDone ? "task-done" : "task"}
                              changeTitle={changeTaskTitle}/>

            </ListItem>
        )
    })


    const addTask = (title:string) => {props.addTask(title,props.todolistId)}
    const removeTodolist =() => props.removeTodolist(props.todolistId)
    const changeTitle=(newTitle:string)=> props.changeTodoListTitle(newTitle,props.todolistId)

    return (
        <div className={todoClasses}>
            <Typography
            variant={'h5'}
            align={'center'}
            fontWeight={'bold'}
            gutterBottom>
                <EditableSpan title={props.title} changeTitle={changeTitle}/>
                <IconButton
                    size={'small'}
                    onClick={removeTodolist}
                    sx={{ml: '15px'}}>
                    <DeleteForeverIcon/>
                </IconButton>

            </Typography>
            <AddItemForm addItem={addTask} recommendedTitleLength={15} maxTitleLength={20}/>
            <List>
                {todoListItems}
            </List>
            <div className={'btnFilterContainer'}>
                <Button
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={() => {
                        props.changeTodoListFilter("all", props.todolistId)
                    }}
                >All
                </Button>
                <Button
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={() => {
                        props.changeTodoListFilter("active", props.todolistId)
                    }}
                >Active
                </Button>
                <Button
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={() => {
                        props.changeTodoListFilter("completed", props.todolistId)
                    }}
                >Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;