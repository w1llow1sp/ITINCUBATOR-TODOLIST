import type {Meta, StoryObj} from '@storybook/react';

import {AddItemForm, AddItemFormPropsType} from '../AddItemForm';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField/TextField';
import {IconButton} from '@mui/material';
import {AddBox} from '@mui/icons-material';
import {Task} from '../Task';
import {TaskType} from '../Todolist';
import {TaskPropsType} from '../Task'


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        task: {id: 'sdl;saldas', title: 'JS', isDone: true},
        todolistId: 'sdsssdcnc'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-arg


export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
};

export const TaskIsNotDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args

    args: {
        task: {id: 'sdl;saldas', title: 'React', isDone: false}
    }
};


const TaskWithHook: FC<TaskPropsType> = (args) => {
    const [task, setTask] = useState(args.task);

    const changeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone})
    }

    const changeTaskTitle = (taskId:string,title: string) => {
        setTask({...task, title: title})
    }

    return <Task
        task={task}
        removeTask={args.removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        todolistId={args.todolistId}/>
}
export const TaskWithHookStory: Story = {
    render: (args => <TaskWithHook
        changeTaskStatus={args.changeTaskStatus}
        changeTaskTitle={args.changeTaskTitle}
        removeTask={args.removeTask}
        task={args.task}
        todolistId={args.todolistId}/>)
}