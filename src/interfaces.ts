export enum DisplayState {
    All,
    Active,
    Completed
};

export interface ITask {
    id: number;
    title: string;
    completed: boolean;
}

