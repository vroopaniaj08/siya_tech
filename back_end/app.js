const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors());
const mongoose = require("mongoose");
let tasks = []; // In-memory task storage


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model("Task", taskSchema);
// Create a Task

app.post("/tasks", async (req, res) => {
    const { title, completed } = req.body;
    const newTask = new Task({ title, completed });
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks from the database
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a Task by ID
app.get("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a Task
app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { title, completed } = req.body;
    task.title = title || task.title;
    task.completed = completed !== undefined ? completed : task.completed;
    try {
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a Task
app.delete("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(204).json({ message: "Task deleted" });
});

// Start the server
const PORT = process.env.PORT || 7002;
// console.log(`Server is running on port ${PORT}`);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});