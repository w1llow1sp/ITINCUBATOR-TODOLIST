import React, {ChangeEvent, KeyboardEvent, FC, useRef, useState} from 'react';
import {FilterValuesType} from "./App";

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
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)


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

        return (
            <li>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={task.isDone}
                />
                <span
                    className={task.isDone ? "task-done" : "task"}>
                    {task.title}
                </span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible: boolean = !title.length || title.length > maxTitleLength || error


    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle,props.todolistId)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const removeTodolist =() => props.removeTodolist(props.todolistId)

    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{color: "white"}}>Title should be shorter</div>
    const longTitleErrorMessage = title.length > maxTitleLength &&
        <div style={{color: "#f23391"}}>Title is too long!!!</div>
    const errorMessage = error &&   <div style={{color: "#f23391"}}>Title is hard required!</div>


    return (
        <div className={todoClasses}>

            <h3>
                {props.title}
                <button onClick={removeTodolist}>X</button>
            </h3>
            <div>
                <input
                    placeholder="Enter task title, please"
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={error ? "input-error" : ""}
                />
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+
                </button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
                {errorMessage}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("all",props.todolistId)
                    }}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("active",props.todolistId)
                    }}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("completed",props.todolistId)
                    }}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;