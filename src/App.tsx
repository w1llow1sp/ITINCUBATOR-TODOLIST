import React from 'react';
import './App.css';
import Todo from "./components/ToDo";

function App() {
    const header1='What to learn'
    const header2='Some title'

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
        { id: 4, title: "Yo2", isDone: false }
    ]

    return (
        <div className="App">
            <Todo header={header1} body={'body'} tasks={tasks1}  />
            <Todo header={header2} tasks={tasks2}  />
        </div>
    );
}

export default App;
