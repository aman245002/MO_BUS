const express = require("express");
const BusStop = require("../models/BusStop");

const router = express.Router();

// Create a new bus stop
router.post("/", async (req, res) => {
  const { name, location, routeNumbers } = req.body;

  if (!name || !location || !routeNumbers || !Array.isArray(routeNumbers) || routeNumbers.length === 0) {
    return res.status(400).json({
      message: "All fields (name, location, routeNumbers) are required, and routeNumbers must be a non-empty array",
    });
  }

  try {
    const newBusStop = new BusStop({ name, location, routeNumbers });
    await newBusStop.save();
    res.status(201).json({ message: "Bus stop created successfully", busStop: newBusStop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bus stops
router.get("/", async (req, res) => {
  try {
    const busStops = await BusStop.find();
    res.status(200).json(busStops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a bus stop by ID
router.get("/:id", async (req, res) => {
  try {
    const busStop = await BusStop.findById(req.params.id);

    if (!busStop) {
      return res.status(404).json({ message: "Bus stop not found" });
    }

    res.status(200).json(busStop);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID format or server error" });
  }
});

module.exports = router;
