// Auth CONtroller
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const db = require("../connect/database");

module.exports = {
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      // Find user in the database

      const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length > 0) {
        // Generate the token
        const token = crypto.randomBytes(20).toString("hex");
        res.status(200).json({ message: "Password reset email sent" });
      } else {
        return res.status(404).json({ message: "No account with that email exists" });
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      res.status(500).json({ message: "Error sending password reset email" });
    }
  },

  resetPassword: async (req, res) => {
    // Implement password reset logic
    res.status(501).json({ message: "Not implemented yet" });
  },

  verifyResetToken: async (req, res) => {
    // Implement token verification logic
    res.status(501).json({ message: "Not implemented yet" });
  },
};
