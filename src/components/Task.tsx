import clsx from 'clsx';
import React, { useRef, useState, useEffect } from 'react';
import { ITask } from '../interfaces';
import { useTasks } from '../CustomHooks';

type TaskProps = {
    task: ITask,
}

export const Task: React.FC<TaskProps> = ({ task }: TaskProps) => {
    const { toggle, remove, edit } = useTasks();
    const [title, setTitle] = useState<string>(task.title);
    const [editState, setEditState] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const classes: string = clsx({ 'list-group-item': true, 'task': true, 'completed': task.completed });
    const labelClasses: string = clsx({ 'form-check-label': true, 'hide-element': editState });
    const inputClasses: string = clsx({ 'form-check-label': true, 'hide-element': !editState });

    useEffect(() => {
        if (editState) {
            inputRef.current?.focus();
        }
    }, [editState]);

    const doubleClickHandler = () => {
        setEditState(prev => !prev);
    };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && title.length > 0) {
            edit(task.id, title);
            setTitle(title);
            setEditState(prev => !prev);
        }
    };

    const lostFocusHandler = () => {
        setTitle(task.title);
        setEditState(false);
    };

    return (
        <li className={classes}>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggle(task.id)}
                />
                <label
                    onDoubleClick={doubleClickHandler}
                    className={labelClasses}
                >
                    {task.title}
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
                    onClick={() => remove(task.id)}
                ><i aria-hidden="true">&times;</i></button>
            </div>

        </li>
    );
};