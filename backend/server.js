const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const busStopRoutes = require("./routes/busStopRoutes");
const busRoutes = require("./routes/busRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ Allow both local and deployed frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://frontend-bus.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Mount Routes
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/busstops", busStopRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
