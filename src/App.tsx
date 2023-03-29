import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './Todolist'
import {v1} from "uuid";

// create
// read
// update
// delete
// CRUD operations
// interface => GUI (CLI, VUI, ....)

export type FilterValuesType = "all"|"active"|"completed"

export type TodolistType = {
    id:string
    title: string
    filter:FilterValuesType
}

type TaskstateType = {
    [todolistId: string]:Array<TaskType>
}

function App(): JSX.Element {
    const todolistId_1 =v1()
    const todolistId_2 =v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id:todolistId_1, title: 'What to learn', filter:'all'},
        {id:todolistId_2, title: 'What to buy', filter:'all'},
    ]);

    const [tasks, setTasks] =useState<TaskstateType>({
        [todolistId_1]:[
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "CSS & SCSS", isDone: true},
            {id: v1(), title: "ES6/TS", isDone: false},
            {id: v1(), title: "REDUX", isDone: false},
        ],
        [todolistId_2]:[
            {id: v1(), title: "WATER", isDone: true},
            {id: v1(), title: "BREAD", isDone: true},
            {id: v1(), title: "SALT", isDone: false},
            {id: v1(), title: "BEER", isDone: false},
        ],
    })


    const removeTask = (taskId: string,todolistId:string) => {
        //создаем переменную и получаем доступ к массиву с нужным todolistId
        const tasksForUpdate:Array<TaskType> =tasks[todolistId]
        //создаем переменную с новым массивом из старого массива
        const resultOfUpdate:Array<TaskType>=tasksForUpdate.filter((task)=> task.id !== taskId)
        //создаем переменную и снимаем копию с массива
        const copyTasks={...tasks}
        copyTasks[todolistId]=resultOfUpdate
        setTasks(copyTasks)
        //setTasks(tasks.filter((task )=> task.id !== taskId))
        //setTasks({...tasks,[todolistId]: tasks[todolistId].filter((task)=> task.id !== taskId)})
    }
    const addTask = (title: string,todolistId:string) => {
        //мы создаем новый объект с введенным тайтлом
        const newTask: TaskType = {
            id: v1(), title, isDone: false
        }
        //создаем переменную и получаем доступ к массиву с нужным id
        const tasksForUpdate:Array<TaskType> =tasks[todolistId]
        //создаем переменную с новым массивом из старого массива и в начале списка есть новая таска
        const resultOfUpdate:Array<TaskType>=[newTask,...tasksForUpdate]
        //создаем переменную и снимаем копию  массива state для изменений
        const copyTasks={...tasks}
        //мы создаем берем старый массив и  добавляем новую таску
        copyTasks[todolistId]=resultOfUpdate
        //и обнвленный массив
        setTasks(copyTasks)

        //setTasks({...tasks, [todolistId]:[newTask,...tasks[todolistId]]})
        /*        const newTask: TaskType = {
                    id: v1(), title: title, isDone: false
                }
                setTasks([newTask, ...tasks])*/
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean,todolistId:string) => {
        //setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }
    const changeTodoListFilter = (filter: FilterValuesType,todolistId:string) => {
        setTodoLists(todoLists.map(task=>task.id === todolistId ? {...task,filter:filter} :task))
        //setFilter(filter)
    }
    const removeTodolist = (todolistId:string) => {
        setTodoLists(todoLists.filter(todolist => todolist.id !==todolistId))
        delete tasks[todolistId]
    }

    //UI
    const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }



    const todoListsComponents = todoLists.map(todolist => {
        const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[todolist.id], todolist.filter)
        return (
            <TodoList
                key={todolist.id}

                todolistId={todolist.id}
                title={todolist.title}
                filter={todolist.filter}
                tasks={tasksForRender}

                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
                changeTodoListFilter={changeTodoListFilter}
            />
        )
    })

    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
