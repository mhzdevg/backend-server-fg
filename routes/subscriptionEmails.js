const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const WaiterEmail = require("../models/SubscriptionEmail");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");

router.post(
  "/addEmail",
  fetchUser,
  bodyParser.json(),
  [
    body("email", "Enter a Valid Email").isEmail(),
  ],
  async (req, res) => {
    try {
      const { email } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if the email already exists in the WaiterEmail model
      const existingEmail = await WaiterEmail.findOne({ email });

      if (existingEmail) {
        // If email exists, send a response that the user is already in the waitlist
        return res.status(200).json({ msg: "You're already in the Waitlist" });
      }

      // If the email doesn't exist, save it to the WaiterEmail model
      const emailDetails = new WaiterEmail({
        email,
        user: req.user.id,
      });
      const savedEmail = await emailDetails.save();
      res.json({msg: "You've successfully Joined the waitlist"});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);

module.exports = router;
