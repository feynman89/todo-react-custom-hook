import React from 'react';
import { Task } from './Task'
import { useTasks } from '../CustomHooks'


export const TasksList: React.FC = () => {
    const [
        tasks, 
        activeCount, 
        completedCount,
        add, 
        remove, 
        toggle, 
        clearCompleted, 
        allCompleted, 
        edit,
      ] = useTasks();
    return (
        <ul className="list-group">
            {tasks.map(task => {
                return (<Task 
                    key={task.id}
                    task={task} 
                />);
            })}
        </ul>
    );
}