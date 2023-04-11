import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType ={
    title:string
    classes?:string
    changeTitle:(newTitle:string)=>void
}

const EditableSpan:FC<EditableSpanPropsType> = (
    {title,
        classes,
        changeTitle
        }
) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [inputValue, setInputValue]= useState<string>(title)
    const toggleEditMode =() => {
        if(isEditMode) {
            changeTitle(inputValue)
        }
        setIsEditMode(!isEditMode)
    }
    const setLocalTitleHandler =(e:ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }


    return (
        isEditMode
            ? <TextField
            size={'small'}
            variant={'standard'}
            value={inputValue}
            autoFocus
            onChange={setLocalTitleHandler}
            onBlur={toggleEditMode}/>
            :<span
                onDoubleClick={toggleEditMode}
                className={classes}>{title}</span>
    );
};

export default EditableSpan;
