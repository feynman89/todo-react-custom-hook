import React from 'react';
import { ButtonsGroup } from './ButtonsGroup/index';
import { Header } from './Header/index';
import { InputForm } from './InputForm/index';
import { TasksList } from './TasksList/index';

const App: React.FC = () => {

    return (
        <div className="container">
            <Header />
            <InputForm />
            <TasksList />
            <ButtonsGroup />
        </div>
    );
};

export default App;
