import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistsAPI} from '../api/todolists-api';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '0723aae9-cb5b-409f-8b97-131245d481a2'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: 'Dimych'})
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
{/*done with button*/}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('');

    const createTodolist = () => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                type="text"
                placeholder={'Name of task'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
            <button onClick={createTodolist}>Create todolist</button>
        </div>
    </div>
}
{/*done with button*/}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('');

    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                type="text"
                placeholder={'Todolist ID'}
                value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        </div>
        <button onClick={deleteTodolist}>Delete Todolist</button>
    </div>
}
{/*done with button*/}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('');
    const [todolistId, setTodolistId] = useState('');

    const updateTodolistTitle = () => {
        todolistsAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{
        JSON.stringify(state)}
        <div>
            <input
                type="text"
                placeholder={'Todolist ID'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <input
                type="text"
                placeholder={'Todolist title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
            <button onClick={updateTodolistTitle}>Update todolist ID</button>
        </div>
    </div>
}
{/*----TASK SECTION----*/}
{/*done with button*/}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('');

    const getTasks =() => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
    <div>
        <input
            type="text"
        value={todolistId}
        placeholder={'Enter Todolist ID'}
        onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <button onClick={getTasks}>Get tasks</button>
    </div>
    </div>
}
{/*done with button*/}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState('');
    const [todolistId, setTodolistId] = useState('');


    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'TodolistId'}
                type="text"
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <input
                placeholder={'TaskId'}
                type="text"
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
            <button onClick={deleteTask}>Delete tasks</button>
        </div>
    </div>
}
{/*done with button*/}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState('');
    const [todolistId, setTodolistId] = useState('');


    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'TodolistId'}
                type="text"
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <input
                placeholder={'Task title'}
                type="text"
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.currentTarget.value)
                }}/>
            <button onClick={createTask}>Create tasks</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(0);
    const [priority, setPriority] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [deadline, setDeadline] = useState('');


    const [todolistId, setTodolistId] = useState('');
    const [taskId, setTaskId] = useState('');


    const createTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline:'',
            description:description,
            priority:priority,
            startDate:'',
            status:status,
            title:taskTitle
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'task id'}
                type="text"
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>

            <input
                placeholder={'TodolistId'}
                type="text"
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <input
                placeholder={'Task title'}
                type="text"
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.currentTarget.value)
                }}/>
            <input
                placeholder={'description'}
                type="text"
                value={description}
                onChange={(e) => {
                    setDescription(e.currentTarget.value)
                }}/>
            <input
                placeholder={'status'}
                type="text"
                value={status}
                onChange={(e) => {
                    setStatus(+e.currentTarget.value)
                }}/>
            <input
                placeholder={'priority'}
                type="text"
                value={priority}
                onChange={(e) => {
                    setPriority(+e.currentTarget.value)
                }}/>
            <button onClick={createTask}>Update tasks</button>
        </div>
    </div>
}
