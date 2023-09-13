const User = require("../models/userModel");
const express = require("express");

const router = express.Router();

// create
router.post("/", async (req, res) => {
  var { name, email, age } = req.body;
  try {
    const userAdded = await User.create({
      // left hand side is compared to schema,
      // right hand side is coming from url's body
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// get
router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// get single user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await User.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// update
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const { name, email, age } = req.body;
    const deletedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
