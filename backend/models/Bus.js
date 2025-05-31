const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  source: { type: mongoose.Schema.Types.ObjectId, ref: "BusStop", required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: "BusStop", required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  price: { type: Number, required: true },
  routeNumber: { type: String, required: true },
  totalTime: { type: String, required: true },
  busStops: [{ type: mongoose.Schema.Types.ObjectId, ref: "BusStop" }],
  busType: { type: String, enum: ["AC", "Non-AC"], default: "AC" },
}, {
  timestamps: true,
});

const Bus = mongoose.model("Bus", busSchema);
module.exports = Bus;
