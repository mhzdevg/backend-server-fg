const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Bookmark = require("../models/Bookmark");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the bookmarks using GET "/api/bookmarks/getBookmarks"
router.get("/getBookmarks", fetchUser, async (req, res) => {
  try {
    const bookmarks = await Bookmark.findOne({ user: req.user.id });

    if (!bookmarks) {
      return res.status(404).json({ message: "Bookmarks not found for the user" });
    }

    res.json({ bookmarks: bookmarks.sku });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

//Route 2: Update the bookmarks array using PATCH "/api/bookmarks/updateBookmarks"
router.patch("/updateBookmarks", fetchUser, async (req, res) => {
    const { sku } = req.body;
  
    try {
      // Find the bookmarks for the current user
      let bookmarks = await Bookmark.findOne({ user: req.user.id });
  
      // If bookmarks don't exist, create a new bookmark entry
      if (!bookmarks) {
        bookmarks = new Bookmark({
          user: req.user.id,
          sku: sku
        });
  
        const savedBookmark = await bookmarks.save();
        return res.json({ message: "New bookmark created", bookmarks: savedBookmark });
      }
  
      // Update the sku array for existing bookmarks
      bookmarks.sku = sku;
  
      // Save the updated bookmarks
      const updatedBookmarks = await bookmarks.save();
  
      res.json({ message: "Bookmarks updated successfully", bookmarks: updatedBookmarks });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occurred");
    }
  });
  

module.exports = router;
