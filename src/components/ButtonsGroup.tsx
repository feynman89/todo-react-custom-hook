import clsx from 'clsx';
import React from 'react';
import { useTasks } from '../CustomHooks';


export const ButtonsGroup: React.FC = () => {
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
    const buttonStyle: string = 
        clsx({
            'btn-group': true, 
            'btn-group-sm': true, 
            'hide-element': !(completedCount.length > 0)
        });
    
    return (
        <div className="buttons-group">
            <span className="badge badge-primary badge-pill">
                {activeCount.length}
            </span>
            <span> items left </span>
            
            <div className="btn-group" role="group">
                <button 
                    className="btn-group btn-group-sm" 
                    onClick={() => {}}
                >All</button>
                <button 
                    className="btn-group btn-group-sm" 
                    onClick={() => {}}
                >Active</button>
                <button 
                    className="btn-group btn-group-sm" 
                    onClick={() => {}}
                >Completed</button>
                <button 
                    className={buttonStyle} 
                    onClick={clearCompleted}
                >Clear completed</button> 
            </div>
        </div>
    )
}