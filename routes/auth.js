const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require('dotenv').config();
var jwt = require("jsonwebtoken");
let fetchUser = require("../middleware/fetchUser");
const bodyParser = require("body-parser");
let JWT_SECRET = process.env.JWT_SECRET;

// Create a User using: POST "/api/auth/"
router.post(
  "/createUser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("phone", "Enter a valid phone number").isLength({
      min: 10,
    }),
    body("password", "Enter a Password of atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  bodyParser.json(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Your email already exists, please Login" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Ocured");
    }
  }
);

// Authenticate a user
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to Log In with Correct Crediantials" });
      }

      const passwordCampare = await bcrypt.compare(password, user.password);
      if (!passwordCampare) {
        return res
          .status(400)
          .json({ error: "Please try to Log In with Correct Crediantials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Ocured");
    }
  }
);

//get user data
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Ocured");
  }
});
module.exports = router;
