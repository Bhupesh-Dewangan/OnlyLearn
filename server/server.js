const express = require("express");
const app = express();
require("dotenv").config();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Main base route
app.get("/", (req, res) => {
  res.send("Backend is running smoothly!");
});

// Start the server listener
app.listen(process.env.PORT, () => {
  console.log(`Server is live on http://localhost:${process.env.PORT}`);
});
