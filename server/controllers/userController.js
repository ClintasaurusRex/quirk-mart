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

  // CREATE USER
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

      // const newUser = await User.create({ name, email, password });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });

      res.status(201).json({
        message: "User created successfully",
        createdUser: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  },
  // LOGIN USER
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Determine if the password is hashed (starts with $2b$) or plain text
      let isPasswordValid;

      if (user.password.startsWith("$2b$")) {
        // If password is hashed with bcrypt, use bcrypt.compare
        isPasswordValid = await bcrypt.compare(password, user.password);
      } else {
        // If password is plain text, use direct comparison
        isPasswordValid = password === user.password;
      }

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token
      const token = generateJWTtoken(user.id);

      // Return user info and token
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Error during login" });
    }
  },

  logout: (req, res) => {
    try {
      // Clear the cookie that contains the JWT token
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0), // Expires immediately
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Server error during logout" });
    }
  },

  // UPDATE USER
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { name, email, password } = req.body;

      // 1. Check if user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // 1a. Verify user is updating their own profile or is an admin
      // req.user comes from the protect middleware (Found this on stackoverflow Not sure if needed)
      if (req.user.id !== parseInt(userId) && req.user.role !== "admin") {
        return res.status(403).json({
          message: "Not authorized to update this user profile",
        });
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

  // DELETE USER
  deleteUser: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);

      // Check if user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify user is deleting their own account or is an admin
      if (req.user.id !== userId && req.user.role !== "admin") {
        return res.status(403).json({
          message: "Not authorized to delete this user",
        });
      }

      const deletedUser = await User.delete(userId);

      if (deletedUser) {
        res.status(200).json({
          message: "User deleted successfully",
          deletedUser: deletedUser,
        });
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
