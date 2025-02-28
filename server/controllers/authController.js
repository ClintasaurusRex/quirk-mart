// Auth CONtroller
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const db = require("../connect/database");

module.exports = {
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      console.log("Passord reset requested for:", email);

      // Find user in the database

      const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

      if (user.rows.length > 0) {
        // Generate the token
        const token = crypto.randomBytes(20).toString("hex");
        console.log("Generated token:", token);

        const resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await db.query(
          "UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3",
          [token, resetTokenExpiry, email]
        );

        // *** Only for testing - in production NEVER return the token in the response ***
        /*   res.status(200).json({
          message: "Password reset process initiated",
          devInfo: {
            user: user.rows[0].email,
            token: token,
            expiresIn: "1 hour",
          },
        }); */

        // SENT THE EMAIL
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const reset = `https://your-domain.com/reset-password?token=${token}`;
        const mailOptions = {
          from: "NO REPLY",
          to: email,
          subject: "Password Reset",
          text: `Click this link to reset passord ${reset}`,
        };

        await transporter.sendMail(mailOptions);

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
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ message: "Token and new password are required" });
      }

      // Verify token exists and hasn't expired
      const result = await db.query(
        "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > $2",
        [token, Date.now()]
      );

      if (result.rows.length === 0) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      const user = result.rows[0];

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.query(
        "UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2",
        [hashedPassword, user.id]
      );

      res.status(200).json({ message: "Password has been successfully reset" });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Error resetting password" });
    }
  },

  verifyResetToken: async (req, res) => {
    // Implement token verification logic
    res.status(501).json({ message: "Not implemented yet" });
  },
};
