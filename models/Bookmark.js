const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookmarkSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  sku: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("bookmarks", BookmarkSchema);
