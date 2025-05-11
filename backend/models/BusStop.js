const mongoose = require("mongoose");

const busStopSchema = new mongoose.Schema({
  name: { type: String, required: true},
  location: { type: String, required: true }, // Could be a string or { lat, lng }
  routeNumbers: [{ type: String, required: true }],
 // This is now required
});

const BusStop = mongoose.model("BusStop", busStopSchema);
module.exports = BusStop;
