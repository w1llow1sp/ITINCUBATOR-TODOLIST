import React, {useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskId:number)=>void
    //changeFilter:(value:FilterValuesType) => void

}

export function Todolist(props: PropsType) {
    let [filter,setFilter] = useState<FilterValuesType>('All');

    let tasksForTodoList =props.tasks // хранение отфильтрованных тасок

    if(filter==='Active') {
        tasksForTodoList =props.tasks.filter(task => !task.isDone)
    } if(filter==='Completed') {
        tasksForTodoList =props.tasks.filter(task => task.isDone)
    }

    function changeFilter(value:FilterValuesType) {
        setFilter(value)
    }

    return( <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>

            {/*Как говорил Игорь -- ставим дуршлаг для фильтрации*/}
            {/*{props.tasks.map(task => {*/}
            {tasksForTodoList.map(task => {
                    return (
                        <li key={task.id}>
                            {/*<button onClick={()=>{task.removeTask(task.id)}}>X</button>*/}
                            <button onClick={()=>props.removeTask(task.id)}>X</button>
                            <input type='checkbox' checked={task.isDone}/>
                            <span>{task.title}</span>
                        </li>)
                }
            )}
        </ul>
        <div>
            {/*<button onClick={()=>props.changeFilter('All')}>All</button>
            <button onClick={()=>props.changeFilter('Active')}>Active</button>
            <button onClick={()=>props.changeFilter('Completed')}>Completed</button>*/}
            <button onClick={()=>changeFilter('All')}>All</button>
            <button onClick={()=>changeFilter('Active')}>Active</button>
            <button onClick={()=>changeFilter('Completed')}>Completed</button>
        </div>
    </div>)
}