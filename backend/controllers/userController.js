const User = require("../models/User");

// @desc Get all users
// @route GET /api/users
// @access Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: Prevent admin from deleting themselves
    if (req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({ message: "You cannot delete your own profile" });
    }

    await User.findByIdAndDelete(req.params.id); // more reliable than user.remove()
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err); // helpful during debugging
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { getAllUsers, deleteUser };
