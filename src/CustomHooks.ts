import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import {TasksContext} from './components/TasksContextProvide'
import { ITask } from './interfaces';

export const useTasks = () => {
    const {tasks, setTasks} = useContext(TasksContext);
    const activeCount = useMemo<ITask[]>(() => tasks.filter(task => !task.completed), [tasks]);
    const completedCount = useMemo<ITask[]>(() => tasks.filter(task => task.completed), [tasks]);
  
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as ITask[];
        setTasks(savedTasks);
    }, []);
      
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
  
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
        setTasks(prev => prev.filter(task => {
        if(task.id !== id){
          return task;
        }
        return null;
      }));
    }, []);
      
    const deleteCompletedTasks = useCallback(() => {
        setTasks(prev => prev.filter(task => {
        if(task.completed === false) {
            return task;
        }
        return null;
        }));
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
  
    return [
        tasks, 
        activeCount, 
        completedCount,
        addHandler, 
        removeHandler, 
        toggleHandler, 
        deleteCompletedTasks, 
        allCompletedHandler, 
        editHandler
    ] as const;  
  }