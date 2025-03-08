const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Password recovery  and ResET
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/verify-reset-token/:token", authController.verifyResetToken);

module.exports = router;
