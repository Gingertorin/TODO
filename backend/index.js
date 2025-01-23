const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import task routes
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mount the tasks routes
app.use("/tasks", taskRoutes);

// Root route for testing
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
