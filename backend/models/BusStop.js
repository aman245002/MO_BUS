const mongoose = require("mongoose");

const busStopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true }, // Human-readable address (optional)
  routeNumbers: [{ type: String, required: true }],
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
});

const BusStop = mongoose.model("BusStop", busStopSchema);
module.exports = BusStop;