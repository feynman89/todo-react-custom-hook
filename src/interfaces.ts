import { DisplayState } from "./enums";

export interface ITask {
    id: number;
    title: string;
    completed: boolean;
}

export interface ICustomHooksReturns {
    tasks: ITask [],
    activeCount: ITask [],
    completedCount: ITask [],
    displayTasks: ITask [],
    add: (title: string) => void,
    toggle: (id: number) => void,
    remove: (id: number) => void,
    clearCompletedTasks: () => void,
    edit: (id: number, title: string) => void,
    allCompleted: () => void,
    changeDisplayState: (displayStat: DisplayState) => void
}
