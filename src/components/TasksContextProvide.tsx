import React, { useState } from 'react';
import App from '../App';
import { ITask } from '../interfaces';

interface ITasksContextValue {
  tasks: ITask[],
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}
  
// export const TasksContext = React.createContext<Partial<ITasksContextValue>>({});
export const TasksContext = React.createContext<ITasksContextValue>({
  tasks: [],
  setTasks: () => {}
});
  
const TasksContextProvide: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
 
  const value = {
    tasks,
    setTasks
  }
  
  return (
    <TasksContext.Provider value={value}>
      <App />
      {/* {children} */}
    </TasksContext.Provider>
  )
}

export default TasksContextProvide