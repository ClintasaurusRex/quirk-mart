const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// In-memory storage for users
let users = [];

// GET all users
router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "Successfully retrieved all users",
    users: users,
  });
});

// Create user
router.post("/", (req, res, next) => {
  const user = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  // Store the new user
  users.push(user);

  res.status(201).json({
    message: "User created successfully",
    createdUser: user,
  });
});

// PUT/ Update
router.put("/:userId", (req, res, next) => {
  res.status(200).json({
    message: "Updated user!",
  });
});

module.exports = router;
