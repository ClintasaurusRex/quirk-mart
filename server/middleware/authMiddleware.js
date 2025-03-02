const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { nextTick } = require("process");

/* 
Authentication middleware to protect routes
This is middleware
1. Extracts JWT token from Authorization header
2. Verifyies the tokens validity
3. Adds the authenticated user to the request object
4. Allows the request to proceed if authenticated
*/

const protect = async (req, res, next) => {
  // As usual Start with the try/catch block
  try {
    let token;

    // Check if token exists in Autorization header with Bearer format
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      // Extract the token
      token = req.headers.authorization.split(" ")[1];
    }

    // Chbeck if the token even exists
    if (!token) {
      return res.status(401).json({ message: "You are NOT AUTHORIZED, no token provided!xo" });
    }

    // Verify that the toke is using our JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user ID from the decoded token
    const user = await User.findById(decoded.id);

    // Check if the user even exists
    if (!user) {
      return res.status(401).json({ message: "NOT AUTHORIZED, user NOT found" });
    }
    // Add the authenticated user to the request object
    // This makes the user availablke to any route handlers that use this middleware
    req.user = user;

    // The proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);

    // This will handle jwt specific errors(MDN)
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "InValid Tolkien" });
    }
    if (error.name === "TokenExpired") {
      res.status(401).json({ message: "Tolkien" });
    }
    res.status(401).json({ message: "Not authorized" });
  }
};

/**
 * Admin-only middleware that verifies the user has admin role
 * Must be used after the protect middleware
 */
const admin = (req, res, next) => {
  // Check if user is authenticated and has admin role
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };
