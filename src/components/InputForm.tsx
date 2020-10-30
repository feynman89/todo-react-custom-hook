import React, {useState} from 'react';
import { useTasks } from '../CustomHooks'


export const InputForm: React.FC = () => {
    const {tasks, completedCount, addHandler, allCompletedHandler} = useTasks();
    const [title, setTitle] = useState<string>('');

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && title.length > 0) {
            addHandler(title);
            setTitle('');
        }
    }

    return(
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input 
                        type="checkbox" 
                        onChange={allCompletedHandler} 
                        checked={(tasks.length > 0 && completedCount.length === tasks.length)}
                    />
                </div>
            </div>
            <input
                className="form-control"
                onChange={changeHandler}
                value={title} 
                type="text" 
                id="title" 
                placeholder="What needs to be done?"
                onKeyPress={keyPressHandler}
            />
        </div>
    );
}