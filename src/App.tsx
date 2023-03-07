import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = 'All'|'Active'|'Completed'


function App() {

    //задаем стейт для динамического перехвата изменений
    let [tasks,setTask] =  useState(
        [
            { id: 1, title: "HTML&CSS", isDone: true },
            { id: 2, title: "JS", isDone: true },
            { id: 3, title: "ReactJS", isDone: false }
        ]
    )


    const removeTask = (IdTask:number) => {
        let filtredTasks = tasks.filter(task => task.id !== IdTask)
        setTask(filtredTasks)
    }

    /*
        let [filter,setFilter] = useState<FilterValuesType>('All');

        let tasksForTodoList =tasks // хранение отфильтрованных тасок
        if(filter==='Active') {
            tasksForTodoList =tasks.filter(task => task.isDone===false)
        } if(filter==='Completed') {
            tasksForTodoList =tasks.filter(task => task.isDone===true)
        }

        function changeFilter(value:FilterValuesType) {
            setFilter(value)
        }
    */


    return (
        <div className="App">
            <Todolist title="What to learn"
                //tasks={tasksForTodoList}
                      tasks={tasks}
                      removeTask={removeTask}
                //changeFilter={changeFilter}

            />
        </div>
    );
}

export default App;