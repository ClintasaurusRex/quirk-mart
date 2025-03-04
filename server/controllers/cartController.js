const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");

module.exports = {
  // Get or create cart
  getCart: async (req, res) => {
    try {
      // Extract token from Authorization header
      const authHeader = req.headers.authorization;
      let userId = null;

      if (authHeader) {
        const token = authHeader.split(" ")[1];
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
        userId = decoded.id;
      }

      const sessionId = req.headers["x-session-id"];

      if (!userId && !sessionId) {
        return res.status(400).json({ message: "User ID or session ID required" });
      }

      const cart = await Cart.findOrCreate(userId, sessionId);
      const cartWithItems = await Cart.getCart(cart.id);

      res.json(cartWithItems);
    } catch (error) {
      console.error("Error getting cart:", error);
      res.status(500).json({ message: "Error getting cart" });
    }
  },

  // Add item to cart
  addItem: async (req, res) => {
    try {
      const { cartId, productId, quantity } = req.body;

      if (!cartId || !productId) {
        return res.status(400).json({ message: "Cart ID and product ID required" });
      }

      const cartItem = await Cart.addItem(cartId, productId, quantity);
      res.json(cartItem);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      res.status(500).json({ message: "Error adding item to cart" });
    }
  },

  // Remove item from cart
  removeItem: async (req, res) => {
    try {
      const { cartId, productId } = req.params;

      if (!cartId || !productId) {
        return res.status(400).json({ message: "Cart ID and product ID required" });
      }

      const removedItem = await Cart.removeItem(cartId, productId);
      res.json(removedItem);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      res.status(500).json({ message: "Error removing item from cart" });
    }
  },

  // Update item quantity
  updateItemQuantity: async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;

      if (!cartId || !productId || quantity === undefined) {
        return res.status(400).json({
          message: "Cart ID, product ID, and quantity required",
        });
      }

      const updatedItem = await Cart.updateItemQuantity(cartId, productId, quantity);
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating item quantity:", error);
      res.status(500).json({ message: "Error updating item quantity" });
    }
  },

  // Transfer guest cart to user cart
  transferCart: async (req, res) => {
    try {
      const { sessionId } = req.body;
      const userId = req.user.id;

      if (!sessionId || !userId) {
        return res.status(400).json({
          message: "Session ID and user ID required",
        });
      }

      const updatedCart = await Cart.transferCart(sessionId, userId);
      res.json(updatedCart);
    } catch (error) {
      console.error("Error transferring cart:", error);
      res.status(500).json({ message: "Error transferring cart" });
    }
  },
};
