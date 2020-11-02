import { useCallback, useMemo, useContext } from 'react';
import { TasksContext } from './components/TasksContextProvide';
import { ICustomHooksReturns, ITask } from './interfaces';
import { DisplayState } from './enums';

export const useTasks = (): ICustomHooksReturns => {
    const { tasks, setTasks, displayState, setDisplayState } = useContext(TasksContext);
    const activeCount = useMemo<ITask[]>(() => tasks.filter(task => !task.completed), [tasks]);
    const completedCount = useMemo<ITask[]>(() => tasks.filter(task => task.completed), [tasks]);
    const displayTasks = useMemo<ITask[]>((): ITask[] => {
        if (displayState === DisplayState.All) {
            return tasks;
        }
        else if (displayState === DisplayState.Active) {
            return activeCount;
        }
        return completedCount;
    }, [tasks, activeCount, completedCount, displayState]);

    const add = useCallback((title: string) => {
        const newTask: ITask = {
            id: Date.now(),
            title: title,
            completed: false
        };
        setTasks(prev => prev.concat(newTask));
    }, []);

    const toggle = useCallback((id: number) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    }, []);

    const remove = useCallback((id: number) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }, []);

    const clearCompletedTasks = useCallback(() => {
        setTasks(prev => prev.filter(task => !task.completed));
    }, []);

    const edit = useCallback((id: number, title: string) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, title: title } : task));
    }, []);

    const allCompleted = useCallback(() => {
        setTasks(prev => prev.map(
            task => completedCount.length === tasks.length ?
                { ...task, completed: !task.completed }
                : { ...task, completed: true }));
    }, [completedCount, tasks]);

    const changeDisplayState = useCallback((displayStat: DisplayState) => { setDisplayState(displayStat); }, []);

    return {
        tasks,
        activeCount,
        completedCount,
        displayTasks,
        add,
        toggle,
        remove,
        clearCompletedTasks,
        edit,
        allCompleted,
        changeDisplayState
    };
};