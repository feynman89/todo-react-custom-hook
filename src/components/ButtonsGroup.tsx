import clsx from 'clsx';
import React from 'react';
import { DisplayState } from '../enums';
import { useTasks } from '../CustomHooks';


export const ButtonsGroup: React.FC = () => {
    const {activeCount, completedCount, deleteCompletedTasks, changeDisplayState} = useTasks();
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
                    onClick={() => changeDisplayState(DisplayState.All)}
                >All</button>
                <button 
                    className="btn-group btn-group-sm" 
                    onClick={() => changeDisplayState(DisplayState.Active)}
                >Active</button>
                <button 
                    className="btn-group btn-group-sm" 
                    onClick={() => changeDisplayState(DisplayState.Completed)}
                >Completed</button>
                <button 
                    className={buttonStyle} 
                    onClick={deleteCompletedTasks}
                >Clear completed</button> 
            </div>
        </div>
    )
}