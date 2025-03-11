// src/components/TaskItem.jsx
import React from 'react';

const TaskItem = ({ task, onDelete, onUpdate }) => {
    const handleDelete = () => {
        onDelete(task._id);
    };

    const handleToggle = () => {
        onUpdate(task._id, { ...task, completed: !task.completed });
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggle}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
            </span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TaskItem;