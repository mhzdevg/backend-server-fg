const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  cartItems: {
    type: Array,
    required: true,
  },
  addressId: {
    type: String,
    required: true,
  },
  amountCharged: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orders", OrderSchema);
