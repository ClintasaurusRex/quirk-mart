const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// In-memory storage for users
let users = [];
// Counter for user IDs - starts at 1
let nextUserId = 1;

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
    id: nextUserId++,
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

router.delete("/:userId", (req, res, next) => {
  const userId = req.params.userId;

  const userIndex = users.findIndex((user) => user.id.toString() === userId);

  if (userIndex !== -1) {
    // Remove the user from the array
    const deletedUser = users.splice(userIndex, 1)[0];

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: deletedUser,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

module.exports = router;
