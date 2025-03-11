import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const App = () => {
    return (
        <div className="m-5 d-flex justify-content-center align-items-center h-100 w-100">
                <div className="col-md-6">
                    <TaskForm />
                </div>
                <div className="col-md-6">
                    <TaskList />
                </div>
        </div>
    );
};

export default App;