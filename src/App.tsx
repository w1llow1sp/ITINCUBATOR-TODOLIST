import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './Todolist'
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Checkbox, Container, createTheme, CssBaseline,
    FormControlLabel,
    FormGroup, Grid,
    IconButton, Paper, ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {amber, lightGreen} from "@mui/material/colors";

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


    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
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

    const changeTaskTitle=(taskId: string, newTitle: string,todolistId:string) => {

        setTasks({...tasks,[todolistId]:tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})}

    const changeTodoListFilter = (filter: FilterValuesType,todolistId:string) => {
        setTodoLists(todoLists.map(task=>task.id === todolistId ? {...task,filter:filter} :task))
        //setFilter(filter)
    }
    const changeTodoListTitle=( newTodoTitle: string,todolistId:string)=>{
        setTodoLists(todoLists.map(tl=>tl.id ===todolistId? {...tl,title:newTodoTitle}: tl))
    }
    const removeTodolist = (todolistId:string) => {
        setTodoLists(todoLists.filter(todolist => todolist.id !==todolistId))
        delete tasks[todolistId]
    }
    const addTodoList=(title:string)=>{
        const newTodo: TodolistType = {
            id:v1(),
            title,
            filter:'all'
        }
        setTodoLists([...todoLists,newTodo])
        setTasks({...tasks,[newTodo.id]:[]})
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
            <Grid item>
                <Paper elevation={8}>
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
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
                </Paper>
            </Grid>
        )
    })

    const mode = isDarkMode? 'dark' : 'light'
    const customTheme = createTheme({
        palette: {
            primary: amber,
            secondary:lightGreen ,
            mode:mode
        }
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline>
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox
                                onChange={(e)=>setIsDarkMode(e.currentTarget.checked)} />}
                            label={isDarkMode ? "Light mode" : "Dark mode"}
                        />
                    </FormGroup>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{p:'15px 0'}}>
            <AddItemForm addItem={addTodoList} recommendedTitleLength={15} maxTitleLength={20}/>
                </Grid>
                <Grid container spacing={4}>
            {todoListsComponents}
                </Grid>
            </Container>
        </div>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
