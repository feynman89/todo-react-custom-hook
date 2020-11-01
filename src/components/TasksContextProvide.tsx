import React, { useState, useEffect } from 'react';
import { ITask } from '../interfaces';
import { DisplayState } from '../enums';

interface ITasksContextValue {
  tasks: ITask[],
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>,
  displayState: DisplayState,
  setDisplayState: React.Dispatch<React.SetStateAction<DisplayState>>,
}

export const TasksContext = React.createContext<ITasksContextValue>({
  tasks: [],
  setTasks: () => { },
  displayState: DisplayState.All,
  setDisplayState: () => { },
});

const TasksContextProvide: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [displayState, setDisplayState] = useState<DisplayState>(DisplayState.All);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as ITask[];
    setTasks(savedTasks);

    const savedDisplayState = JSON.parse(localStorage.getItem('displayState') || '0') as DisplayState;
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
  }

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  )
}

export default TasksContextProvide