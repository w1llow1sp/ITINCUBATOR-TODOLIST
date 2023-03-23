import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    isChecked:(taskID:string,newIsDone:boolean)=>void
}

export function Todolist(props: PropsType) {
    /* const [error, setError] = useState(false);*/
    const [error, setError] = useState<string|null>(null);
    let [title, setTitle] = useState("")
    const [buttonName, setButtonName] = useState<string>('all');

//2.перепишем функцию для отладки
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is required!')

        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
        setButtonName('all')
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active")
        setButtonName('active')
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
        setButtonName('completed')
    };

    const onClickHandler = (taskID:string) => props.removeTask(taskID)
    const isChecked = (taskID:string, eventValue:boolean) => {props.isChecked(taskID,eventValue)}



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''}
                   value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            {error && <div className={error ? s.errorMessage: ''}>{error}</div>}
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    /*                  const onClickHandler = () => props.removeTask(t.id)
                                        const isChecked = (event:ChangeEvent<HTMLInputElement>) => {props.isChecked(t.id,event.currentTarget.checked)}*/
                    return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={(event)=>isChecked(t.id,event.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={()=>onClickHandler(t.id)}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={ onAllClickHandler }  className={buttonName === 'all' ? s.activeFilter : ''}>All</button>
            <button onClick={ onActiveClickHandler } className={buttonName === 'active' ? s.activeFilter : ''}>Active</button>
            <button onClick={ onCompletedClickHandler } className={buttonName === 'completed' ? s.activeFilter : ''}>Completed</button>
        </div>
    </div>
}