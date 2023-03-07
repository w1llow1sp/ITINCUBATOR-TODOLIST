import React from "react";

type PropsType ={
    header:string
    body?:string
    tasks: TaskType[]

}
type TaskType ={
    id:number
    title:string
    isDone:boolean
}

const Todo = (props:PropsType) => {
    const taskMap =props.tasks.map((el)=>{
        return(
            <li>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.header}</h3>
            <h3>{props.body}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskMap}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )

}
export default Todo