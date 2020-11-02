import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import TasksContextProvide from './components/TasksContextProvide';
import App from './App';


ReactDOM.render(
    <React.StrictMode>
        <TasksContextProvide>
            <App />
        </TasksContextProvide>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
