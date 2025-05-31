const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Add this line
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const busStopRoutes = require("./routes/busStopRoutes");
const busRoutes = require("./routes/busRoutes");


dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS for all origins (for dev)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Mount Routes
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/busstops", busStopRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
