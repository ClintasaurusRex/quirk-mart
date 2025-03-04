const db = require('../connect/database');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  // Find or create cart for a user/session
  findOrCreate: async (userId = null, sessionId = null) => {
    let cart;

    if (userId) {
      // Try to find existing cart for user
      cart = await db.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    } else if (sessionId) {
      // Try to find existing cart for session
      cart = await db.query('SELECT * FROM carts WHERE session_id = $1', [
        sessionId,
      ]);
    }

    if (cart && cart.rows.length > 0) {
      return cart.rows[0];
    }

    // Create new cart if none exists
    const newCart = await db.query(
      'INSERT INTO carts (user_id, session_id) VALUES ($1, $2) RETURNING *',
      [userId, sessionId || uuidv4()]
    );

    return newCart.rows[0];
  },

  // Add item to cart
  addItem: async (cartId, productId, quantity = 1) => {
    // Check if item already exists in cart
    const existingItem = await db.query(
      'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, productId]
    );

    if (existingItem.rows.length > 0) {
      // Update quantity if item exists
      const updatedItem = await db.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *',
        [quantity, cartId, productId]
      );
      return updatedItem.rows[0];
    }

    // Add new item if it doesn't exist
    const newItem = await db.query(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [cartId, productId, quantity]
    );
    return newItem.rows[0];
  },

  // Get cart with items
  getCart: async (cartId) => {
    const result = await db.query(
      `SELECT c.*, 
        json_agg(json_build_object(
          'id', ci.id,
          'product_id', ci.product_id,
          'quantity', ci.quantity
        )) as items
      FROM carts c
      LEFT JOIN cart_items ci ON c.id = ci.cart_id
      WHERE c.id = $1
      GROUP BY c.id`,
      [cartId]
    );
    return result.rows[0];
  },

  // Transfer guest cart to user cart
  transferCart: async (sessionId, userId) => {
    const result = await db.query(
      'UPDATE carts SET user_id = $1, session_id = NULL WHERE session_id = $2 RETURNING *',
      [userId, sessionId]
    );
    return result.rows[0];
  },

  // Remove item from cart
  removeItem: async (cartId, productId) => {
    const result = await db.query(
      'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *',
      [cartId, productId]
    );
    return result.rows[0];
  },

  // Update item quantity
  updateItemQuantity: async (cartId, productId, quantity) => {
    const result = await db.query(
      'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *',
      [quantity, cartId, productId]
    );
    return result.rows[0];
  },
};
