import React from 'react';
import { ButtonsGroup } from './components/ButtonsGroup';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { TasksList } from './components/TasksList';


const App: React.FC = () => {

  return (
    <div className="container"> 
      <Header />
      <InputForm />
      <TasksList />
      <ButtonsGroup />
    </div>
  );
}

export default App;
