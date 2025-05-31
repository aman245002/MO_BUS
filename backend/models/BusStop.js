const mongoose = require("mongoose");

const busStopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true }, // e.g., "Sector 12, New Delhi"
  routeNumbers: [{ type: String, required: true }],
});

const BusStop = mongoose.model("BusStop", busStopSchema);
module.exports = BusStop;
