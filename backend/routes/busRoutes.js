const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");
const { protect, admin } = require("../middleware/authMiddleware");
const BusStop = require("../models/BusStop");
// Add Bus (Admin)
router.post("/", protect, admin, async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Buses
router.get("/all", async (req, res) => {
  try {
    const buses = await Bus.find()
      .populate("source", "name")
      .populate("destination", "name");
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { stop } = req.query;

    if (!stop) {
      return res.status(400).json({ message: "Bus stop name is required." });
    }

    // Find matching bus stop (case-insensitive)
    const busStop = await BusStop.findOne({ name: new RegExp(`^${stop}$`, "i") });

    if (!busStop) {
      return res.status(404).json({ message: "Bus stop not found." });
    }

    const buses = await Bus.find({
      $or: [
        { source: busStop._id },
        { busStops: busStop._id },
      ],
    })
      .populate("source", "name")
      .populate("destination", "name")
      .populate("busStops", "name");

    res.json(buses);
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete Bus
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    await bus.deleteOne();
    res.json({ message: "Bus deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single bus by ID
router.get("/:id", protect, admin, async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id)
      .populate("source", "name")
      .populate("destination", "name")
      .populate("busStops", "name");

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Update a bus by ID
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    Object.assign(bus, req.body); // Update fields dynamically
    await bus.save();
    res.json({ message: "Bus updated successfully", bus });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search Buses by name/number or source/destination (Public Access)
// backend/routes/busRoutes.js
// Search Buses by name/number or source/destination
// Enhanced search: source/destination in either source or busStops
// Search Buses by a single Bus Stop name
// Search Buses by bus stop name





module.exports = router;
