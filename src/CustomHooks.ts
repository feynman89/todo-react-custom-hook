import { useCallback, useMemo, useContext } from 'react';
import { TasksContext } from './components/TasksContextProvide'
import { ITask } from './interfaces';
import { DisplayState } from './enums';

export const useTasks = () => {
    const {tasks, setTasks, displayState, setDisplayState} = useContext(TasksContext);
    const activeCount = useMemo<ITask[]>(() => tasks.filter(task => !task.completed), [tasks]);
    const completedCount = useMemo<ITask[]>(() => tasks.filter(task => task.completed), [tasks]);
    const displayTasks = useMemo<ITask[]>((): ITask[] => {
        if(displayState === DisplayState.All) {
            return tasks;
        }
        else if(displayState === DisplayState.Active) {
            return activeCount;
        }
        return completedCount;
    }, [tasks, activeCount, completedCount, displayState]);
  
    const addHandler = useCallback((title: string) => {
        const newTask: ITask = {
            id: Date.now(),
            title: title,
            completed: false
        };
        setTasks(prev => prev.concat(newTask));
    }, []);
      
    const toggleHandler = useCallback((id: number) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    }, []);
      
    const removeHandler = useCallback((id: number) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }, []);
      
    const deleteCompletedTasks = useCallback(() => {
        setTasks(prev => prev.filter(task => !task.completed));
    }, []);
      
    const editHandler = useCallback((id: number, title: string) => {
        setTasks(prev => prev.map(task => task.id === id ? {...task, title: title} : task));
    }, []);
      
    const allCompletedHandler = useCallback(() => {
        setTasks(prev => prev.map(
        task => completedCount.length === tasks.length ? 
            {...task, completed: !task.completed} 
            : {...task, completed: true}));
    }, [completedCount, tasks]);

    const changeDisplayState = useCallback((displayStat: DisplayState) => { setDisplayState(displayStat) }, []);

    return {
        tasks, 
        activeCount, 
        completedCount,
        displayTasks, 
        addHandler, 
        removeHandler, 
        toggleHandler, 
        deleteCompletedTasks, 
        allCompletedHandler, 
        editHandler,
        changeDisplayState
    };
  }