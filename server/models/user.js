const db = require("../connect/database");

// Export an object with all user-related database operations
module.exports = {
  findAll: async () => {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
  },

  findById: async (id) => {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  findByEmail: async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] || null;
  },

  create: async (userData) => {
    const { name, email, password } = userData;
    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    return result.rows[0];
  },

  update: async (id, userData) => {
    // Implementation for updating user
  },

  delete: async (id) => {
    // Implementation for deleting user
  },
};
