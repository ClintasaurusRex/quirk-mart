// MODEL

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// GET all users
router.get("/", userController.getAllUsers);

// GET single user by ID
router.get("/:userId", userController.getUserById);

// Update user
router.put("/:userId", protect, userController.updateUser);

// Delete user
router.delete("/:userId", protect, admin, userController.deleteUser);

module.exports = router;
