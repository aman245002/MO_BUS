const express = require("express");
const Bus = require("../models/Bus");
const BusStop = require("../models/BusStop"); 
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Add a new bus (Admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      number,
      source,
      destination,
      totalSeats,
      availableSeats,
      departureTime,
      arrivalTime,
      price,
      routeNumber,
      totalTime,
      busStops,
      busType,
    } = req.body;

    const busExists = await Bus.findOne({ number });
    if (busExists) {
      return res.status(400).json({ message: "Bus with this number already exists" });
    }

    // Check if source and destination are valid BusStops
    const sourceStop = await BusStop.findById(source);
    const destinationStop = await BusStop.findById(destination);
    if (!sourceStop || !destinationStop) {
      return res.status(404).json({ message: "Invalid source or destination BusStop" });
    }

    const newBus = new Bus({
      name,
      number,
      source,
      destination,
      totalSeats,
      availableSeats,
      departureTime,
      arrivalTime,
      price,
      routeNumber,
      totalTime,
      busStops, // Assuming busStops is an array of valid BusStop _ids
      busType,
    });

    await newBus.save();
    res.status(201).json({ message: "Bus added successfully", bus: newBus });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Get All Buses (Accessible to Everyone)
router.get("/all", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get Bus by ID
router.get("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update Bus Details (Admin Only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Update bus details
    const { name, number, source, destination, totalSeats, availableSeats, departureTime, arrivalTime, price, routeNumber, totalTime, busStops, busType } = req.body;

    bus.name = name || bus.name;
    bus.number = number || bus.number;
    bus.source = source || bus.source;
    bus.destination = destination || bus.destination;
    bus.totalSeats = totalSeats || bus.totalSeats;
    bus.availableSeats = availableSeats || bus.availableSeats;
    bus.departureTime = departureTime || bus.departureTime;
    bus.arrivalTime = arrivalTime || bus.arrivalTime;
    bus.price = price || bus.price;
    bus.routeNumber = routeNumber || bus.routeNumber;
    bus.totalTime = totalTime || bus.totalTime;
    bus.busStops = busStops || bus.busStops;
    bus.busType = busType || bus.busType;  // Update busType here

    await bus.save();

    res.status(200).json({ message: "Bus updated successfully", bus });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete a bus (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    await bus.deleteOne(); // Delete bus from database

    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
