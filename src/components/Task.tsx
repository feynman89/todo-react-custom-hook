import clsx from 'clsx';
import React, { useRef, useState, useEffect } from 'react';
import { ITask } from '../interfaces';
import { useTasks } from '../CustomHooks'

type TaskProps = {
    task: ITask,
}

export const Task: React.FC<TaskProps> = (props) => {
    const {toggleHandler, removeHandler, editHandler} = useTasks();
    const [title, setTitle] = useState<string>(props.task.title);
    const [editState, setEditState] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const classes: string = clsx({'list-group-item': true, 'task': true, 'completed': props.task.completed});
    const labelClasses: string = clsx({'form-check-label': true, 'hide-element': editState});
    const inputClasses: string = clsx({'form-check-label': true, 'hide-element': !editState});

    useEffect(() => {
        if(editState) {
            inputRef.current?.focus();
        }
    }, [editState]);

    const doubleClickHandler = (event: React.MouseEvent) => {
        setEditState(prev => !prev);
    }
    
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    
    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && title.length > 0) {
            editHandler(props.task.id, title);
            setTitle(title);
            setEditState(prev => !prev);
        }
    }

    const lostFocusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(props.task.title);
        setEditState(false);
    }

    return (
        <li className={classes}>
            <div className="form-check">
                <input 
                    className="form-check-input"
                    type="checkbox" 
                    checked={props.task.completed} 
                    onChange={() => toggleHandler(props.task.id)}
                />
                <label 
                    onDoubleClick={doubleClickHandler} 
                    className={labelClasses}
                >
                    {props.task.title}
                </label>
                <input 
                    type="edit"
                    ref={inputRef}
                    onBlur={lostFocusHandler}
                    className={inputClasses} 
                    value={title} 
                    onChange={changeHandler}
                    onKeyPress={keyPressHandler}
                />
                <button 
                    className="close text-danger" 
                    onClick={() => removeHandler(props.task.id)}
                ><i aria-hidden="true">&times;</i></button>
            </div>

        </li>
    );
}