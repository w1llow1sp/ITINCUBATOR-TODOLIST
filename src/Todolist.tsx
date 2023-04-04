import React, {ChangeEvent,  FC} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
            <li key={task.id}>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={task.isDone}
                />
                <EditableSpan title={task.title}
                              classes={task.isDone ? "task-done" : "task"}
                              changeTitle={changeTaskTitle}/>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })


    const addTask = (title:string) => {props.addTask(title,props.todolistId)}
    const removeTodolist =() => props.removeTodolist(props.todolistId)
    const changeTitle=(newTitle:string)=> props.changeTodoListTitle(newTitle,props.todolistId)

    return (
        <div className={todoClasses}>
            <h3>
                <EditableSpan title={props.title}  changeTitle={changeTitle}/>
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTask} recommendedTitleLength={15} maxTitleLength={20}/>
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