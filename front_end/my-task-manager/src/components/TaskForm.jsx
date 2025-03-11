// src/components/TaskForm.jsx
import React, { useState } from 'react';
import { createTask } from '../api';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = await createTask({ title, completed });
        onTaskAdded(newTask);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task"
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;