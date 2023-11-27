const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Address = require("../models/Address");
const { body, validationResult } = require("express-validator");

//Route 1: Get All the Addresses using GET "/api/auth/fetchAllAddresses"
router.get("/fetchAllAddresses", fetchUser, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.json(addresses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Ocured");
  }
});

//Route 2: Add a address using Post "/api/auth/addAddress"
router.post(
  "/addAddress",
  fetchUser,
  [
    body("id"),
    body("name", "Enter a Valid Title").trim().isLength({ min: 1 }),
    body("phone", "Enter a valid phone number").isLength({ min: 9 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("address", "Enter your Address").trim().isLength({ min: 1 }),
    body("zip", "Enter a valid postal code").trim().isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { id, name, phone, email, address, zip } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const addressDetails = new Address({
        id,
        name,
        phone,
        email,
        address,
        zip,
        user: req.user.id,
      });
      const savedAddress = await addressDetails.save();
      res.json(savedAddress);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Ocured");
    }
  }
);

// router.put('/updateNote/:id', fetchUser, async (req, res) => {
//     const { title, description, tag } = req.body;
//     try {
//         const newNote = {}
//         if (title) { newNote.title = title }
//         if (description) { newNote.description = description }
//         if (tag) { newNote.tag = tag }

//         let note = await Note.findById(req.params.id)

//         if (!note) { return res.status(404).send("Not Found") }
//         if (note.user.toString() !== req.user.id) { return res.status(401).send('You are not Allowed') }

//         note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
//         res.json(note)
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send('Some Error Ocured');
//     }
// })

//Route 3: Delete a address using DELETE "/api/auth//deleteAddress/:id"
router.delete("/deleteAddress/:id", fetchUser, async (req, res) => {
  try {
    let address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).send("Not Found");
    }
    if (address.user.toString() !== req.user.id) {
      return res.status(401).send("You are not Allowed");
    }

    address = await Address.findByIdAndDelete(req.params.id);
    res.json("Address has been deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Ocured");
  }
});

module.exports = router;
