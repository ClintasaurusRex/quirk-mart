const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

// Get or create cart (works for both authenticated and guest users)
router.get("/", protect, cartController.getCart);

// Add item to cart
router.post("/items", cartController.addItem);

// Remove item from cart
router.delete("/:cartId/items/:productId", cartController.removeItem);

// Update item quantity
router.put("/:cartId/items/:productId", cartController.updateItemQuantity);

// Transfer guest cart to user cart (requires authentication)
router.post("/transfer", protect, cartController.transferCart);

module.exports = router;
