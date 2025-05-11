const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes"); // Import Bus Routes
const busStopRoutes = require("./routes/busStopRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Mount Routes
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes); // ✅ Register the bus routes
app.use("/api/busstops", busStopRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
