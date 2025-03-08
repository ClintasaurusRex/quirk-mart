// MODEL

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// Login/Logout route
router.post("/login", userController.login);
router.post("/logout", userController.logout);

// Create user
router.post("/register", userController.createUser);

// GET all users
router.get("/", userController.getAllUsers);

// GET single user by ID
router.get("/:userId", userController.getUserById);

// Update user
router.put("/:userId", protect, userController.updateUser);

router.post("/:userId", userController.logout);

// Delete user
router.delete("/:userId", protect, admin, userController.deleteUser);

module.exports = router;
