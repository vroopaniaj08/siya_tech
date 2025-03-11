// src/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../api';
import TaskItem from './TaskItem';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        };
        fetchTasks();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
    };

    const handleUpdate = async (id, updatedTask) => {
        await updateTask(id, updatedTask);
        setTasks((prevTasks) =>
            prevTasks.map(task => (task._id === id ? updatedTask : task))
        );
    };

    return (
        <div>
            <h2>Task List</h2>
            {tasks.map(task => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            ))}
        </div>
    );
};

export default TaskList;