const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Order = require("../models/Order");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the orders of a user using GET "/api/orders/getUserOrders"
router.get("/getUserOrders", fetchUser, async (req, res) => {
  try {
    const placedOrders = await Order.find({ user: req.user.id });
    res.json(placedOrders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Ocured");
  }
});

//Route 2: Place the order of a user using POST "/api/orders/placeOrder"
router.post(
  "/placeOrder",
  fetchUser,
  [
    body("cartItems").isLength({ min: 1 }),
    body("addressId").trim().isLength({ min: 1 }),
    body("amountCharged"),
  ],
  async (req, res) => {
    try {
      const { cartItems, addressId, amountCharged } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const orderDetails = new Order({
        cartItems, addressId, amountCharged,
        user: req.user.id,
      });
      const placedOrder = await orderDetails.save();
      res.json(placedOrder);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Ocured");
    }
  }
);

module.exports = router;
