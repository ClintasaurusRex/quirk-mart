const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Login route
router.post("/login", userController.login);

// Create user
router.post("/register", userController.createUser);

// Password recovery  and ResET
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/verify-reset-token/:token", authController.verifyResetToken);

module.exports = router;
