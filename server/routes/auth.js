const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Login route
router.post("/login", userController.login);

// Create user
router.post("/register", userController.createUser);

// You can add other auth-related routes here
// router.post("/register", userController.createUser);
// router.post("/forgot-password", userController.forgotPassword);
// router.post("/reset-password", userController.resetPassword);

module.exports = router;
