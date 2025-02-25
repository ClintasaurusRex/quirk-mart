const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// GET all users

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.status(200).json({
      message: "Successfully retrieved all users",
      users: result.rows,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

// GET single user by ID
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (result.rows.length > 0) {
      res.status(200).json({
        message: "User found",
        user: result.rows[0],
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error retrieving user" });
  }
});

// Create user

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if email already exists
    const emailCheck = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // If we get here, email is unique
    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    res.status(201).json({
      message: "User created successfully",
      createdUser: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Update user
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, password } = req.body;

    // Build dynamic update query based on provided fields
    let updates = [];
    let values = [];
    let paramIndex = 1;

    if (name) {
      updates.push(`name = ${paramIndex++}`);
      values.push(name);
    }
    if (email) {
      updates.push(`email = ${paramIndex++}`);
      values.push(email);
    }
    if (password) {
      updates.push(`password = ${paramIndex++}`);
      values.push(password);
    }

    // If no fields to update were provided
    if (updates.length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    // Add userId to values array
    values.push(userId);

    const query = `
      UPDATE users 
      SET ${updates.join(", ")} 
      WHERE id = ${paramIndex} 
      RETURNING *
    `;

    const result = await db.query(query, values);

    if (result.rows.length > 0) {
      res.status(200).json({
        message: "User updated successfully",
        updatedUser: result.rows[0],
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

// Delete user
router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);

    if (result.rows.length > 0) {
      res.status(200).json({
        message: "User deleted successfully",
        deletedUser: result.rows[0],
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});
module.exports = router;
