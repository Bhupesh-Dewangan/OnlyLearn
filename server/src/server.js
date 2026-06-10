require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { initSocket } = require("./socket");

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

// Initialize Socket handler
initSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});

