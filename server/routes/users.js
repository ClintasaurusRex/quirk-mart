// MODEL

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET all users
router.get("/", userController.getAllUsers);

// GET single user by ID
router.get("/:userId", userController.getUserById);

// Update user
router.put("/:userId", userController.updateUser);

// Delete user
router.delete("/:userId", userController.deleteUser);

module.exports = router;
