import React from 'react';
import { Task } from './Task/index';
import { useTasks } from '../../CustomHook';

export const TasksList: React.FC = () => {
    const { displayTasks } = useTasks();
    return (
        <ul className="list-group">
            {displayTasks.map(task => {
                return (<Task
                    key={task.id}
                    task={task}
                />);
            })}
        </ul>
    );
};
