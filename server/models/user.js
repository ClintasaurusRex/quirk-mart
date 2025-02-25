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
    // Get the keys that have values to update
    const fields = Object.keys(userData).filter(
      (key) => ["name", "email", "password"].includes(key) && userData[key] !== undefined
    );

    // If no valid fields to update, return null
    if (fields.length === 0) return null;

    // Construct the SET clause and values array
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");
    const values = fields.map((field) => userData[field]);

    // Add the ID as the last parameter
    values.push(id);
    const paramIndex = values.length;

    // Construct and execute the query
    const query = `UPDATE users SET ${setClause} WHERE id = $${paramIndex} RETURNING *`;
    const result = await db.query(query, values);

    // Return the updated user or null if not found
    return result.rows[0] || null;
  },

  delete: async (id) => {
    console.log(`Attempting to delete user with ID: ${id}, type: ${typeof id}`);

    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

    console.log(`Delete result:`, result.rows);

    return result.rows[0] || null;
  },
};
