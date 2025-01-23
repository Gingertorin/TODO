const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// In-memory storage for tasks (for now; replace with DB later)
let tasks = [
    {
        urs: "username", // User's name
        entry: "username-1", // Composite primary key (username + UID)
        category: null, // Category ID or NaN (for now null is preferred in JavaScript)
        completed: false, // Task completion status
        task_desc: "The task that should be completed.", // Task description
        recorded: new Date().toISOString(), // Current date-time when recorded
        do_before: "2025-01-31", // Deadline (YYYY-MM-DD format)
        schedual: false, // If it is added to a schedualing app with reminder. (Like a meeting)
        priority: "none", // Priority ENUM('low', 'none', 'medium', 'high')
    },
];


// Get all tasks
router.get("/", (req, res) => {
    res.json(tasks);
});

// Add a new task
router.post("/", (req, res) => {
    const { urs, category, task_desc, do_before, schedual, priority } = req.body;
    if (!urs || !task_desc) {
        return res.status(400).json({ error: "Username is required" });
    }

    // Generate a new composite UID
    const entry = `${urs}-${uuidv4()}`;

    const newTask = {
        usr,
        entry,
        category: category || null,
        completed: false,
        task_desc,
        recorded: new Date().toISOString(),
        do_before: do_before || null,
        schedual: schedual || false,
        priority: priority || "none"
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Edit a task
router.put("/:usr", (req, res) => {
    const { urs } = req.params;
    const userTasks = tasks.filter((task) => task.urs === urs);
    if (userTasks.length == 0) {
        return res.status(404).json({ error: "No tasks found for this user" });
    }
    res.json(userTasks);
});

// Delete a task
router.delete("/:entry", (req, res) => {
    const { entry } = req.params;
    const taskIndex = tasks.findIndex((task) => task.entry === entry);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

module.exports = router;
