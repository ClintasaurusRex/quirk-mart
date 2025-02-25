const express = require("express");
const router = express.Router();

// GET
router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "Handling GET requests to /api/users",
  });
});

// Create
router.post("/", (req, res, next) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  res.status(201).json({
    message: "Handling POST requests to /api/users",
    createdUser: user,
  });
});

// Delete
router.put("/:userId", (req, res, next) => {
  res.status(200).json({
    message: "Updated user!",
  });
});

module.exports = router;
