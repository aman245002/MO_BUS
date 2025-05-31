const express = require("express");
const BusStop = require("../models/BusStop");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new bus stop (Admin only)
router.post("/", protect, admin, async (req, res) => {
  const { name, location, routeNumbers } = req.body;

  if (
    !name ||
    !location ||
    !routeNumbers ||
    !Array.isArray(routeNumbers) ||
    routeNumbers.length === 0
  ) {
    return res.status(400).json({
      message:
        "All fields (name, location, routeNumbers) are required, and routeNumbers must be a non-empty array",
    });
  }

  try {
    const newBusStop = new BusStop({ name, location, routeNumbers });
    await newBusStop.save();
    res
      .status(201)
      .json({ message: "Bus stop created successfully", busStop: newBusStop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bus stops
router.get("/", protect, async (req, res) => {
  try {
    const stops = await BusStop.find();
    res.json(stops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bus stops" });
  }
});

// Get a bus stop by ID
router.get("/:id", protect, async (req, res) => {
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

// Delete a bus stop by ID (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const busStop = await BusStop.findById(req.params.id);

    if (!busStop) {
      return res.status(404).json({ message: "Bus stop not found" });
    }

    await busStop.deleteOne();
    res.status(200).json({ message: "Bus stop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a bus stop by ID (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  const { name, location, routeNumbers } = req.body;

  if (
    !name ||
    !location ||
    !routeNumbers ||
    !Array.isArray(routeNumbers) ||
    routeNumbers.length === 0
  ) {
    return res.status(400).json({
      message:
        "All fields (name, location, routeNumbers) are required, and routeNumbers must be a non-empty array",
    });
  }

  try {
    const busStop = await BusStop.findByIdAndUpdate(
      req.params.id,
      { name, location, routeNumbers },
      { new: true }
    );

    if (!busStop) {
      return res.status(404).json({ message: "Bus stop not found" });
    }

    res.json({ message: "Bus stop updated successfully", busStop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
