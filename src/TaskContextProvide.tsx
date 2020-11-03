import React, { useState, useEffect } from 'react';
import { ITask } from './interfaces';
import { DisplayState } from './enums';
import PropTypes from 'prop-types';

type TasksContextValue = {
    tasks: ITask[],
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>,
    displayState: DisplayState,
    setDisplayState: React.Dispatch<React.SetStateAction<DisplayState>>,
}

export const TasksContext = React.createContext<TasksContextValue>({
    tasks: [],
    setTasks: () => { 
        // Init later
    },
    displayState: DisplayState.All,
    setDisplayState: () => {
        //Init later
    },
});

const TasksContextProvide: React.FC = ({ children }) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [displayState, setDisplayState] = useState<DisplayState>(DisplayState.All);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as ITask[];
        setTasks(savedTasks);

        const savedDisplayState = 
        JSON.parse(localStorage.getItem('displayState') || '0') as DisplayState;
        setDisplayState(savedDisplayState);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('displayState', JSON.stringify(displayState));
    }, [displayState]);

    const value = {
        tasks,
        setTasks,
        displayState,
        setDisplayState,
    };

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    );
};

TasksContextProvide.propTypes = {
    children: PropTypes.node.isRequired
};

export default TasksContextProvide;
