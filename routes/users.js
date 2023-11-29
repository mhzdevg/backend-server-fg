const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/User");
const bodyParser = require("body-parser");

// GET user details by ID
router.get("/getUser", fetchUser, async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    res.json(userDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

// UPDATE user details by ID
router.put("/updateUser", fetchUser, bodyParser.json(), async (req, res) => {
  const { name, phone, email } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (email) user.email = email;

    await user.save();

    res.json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

module.exports = router;
