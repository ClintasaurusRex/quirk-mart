// MODEL

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

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
router.put("/:userId", userController.updateUser);

// Delete user
router.delete("/:userId", userController.deleteUser);

module.exports = router;
