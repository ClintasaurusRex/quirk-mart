const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json({
        message: "Successfully retrieved all users",
        users: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error retrieving users" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (user) {
        res.status(200).json({
          message: "User found",
          user: user,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error retrieving user" });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
      }

      // Check if email already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const newUser = await User.create({ name, email, password });

      res.status(201).json({
        message: "User created successfully",
        createdUser: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { name, email, password } = req.body;

      // 1. Check if user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // 2. If no fields to update were provided
      if (!name && !email && !password) {
        return res.status(400).json({ message: "No update data provided" });
      }

      // 3. Create userData object with only defined fields
      const userData = {};
      if (name) userData.name = name;
      if (email) userData.email = email;

      // 4. Hash password if its being updateEd

      if (password) {
        userData.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await User.update(userId, userData);

      res.status(200).json({
        message: "User updated successfully",
        updatedUser: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const deletedUser = await User.delete(userId);

      if (deletedUser) {
        res.status(200).json({
          message: "User deleted successfully",
          deletedUser: deletedUser,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
    }
  },
};
const generateJWTtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });
};
