import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const App = () => {
    return (
        <div className="mt-4 d-flex flex-column align-items-center">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <TaskForm />
                </div>
                <div className="col-md-6">
                    <TaskList />
                </div>
            </div>
        </div>
    );
};

export default App;