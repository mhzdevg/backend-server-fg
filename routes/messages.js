const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");

//Route 1: Send the message using POST "/api/messages/sendMessage"
router.post(
  "/sendMessage",
  fetchUser,
  bodyParser.json(),
  [
    body("name", "Enter a Valid Title").trim().isLength({ min: 1 }),
    body("phone", "Enter a valid phone number").isLength({ min: 9 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("message", "Enter some Message").trim().isLength({ min: 9 }),
  ],
  async (req, res) => {
    try {
      const { name, phone, email, message } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const messageDetails = new Message({
        name,
        phone,
        email,
        message,
        user: req.user.id,
      });
      const sentMessage = await messageDetails.save();
      res.json(sentMessage);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Ocured");
    }
  }
);

module.exports = router;
