// Import your database connection module
const db = require("./connect/database");

async function testConnection() {
  try {
    // Execute a simple query
    const result = await db.query("SELECT NOW()");
    console.log("Database connection successful!");
    console.log("Current database time:", result.rows[0].now);
    console.log("Connection configuration:", {
      user: process.env.DB_USER || "quirkmart",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "quirkmart_dev",
      port: process.env.DB_PORT || 5432,
    });
  } catch (error) {
    console.error("Database connection failed!");
    console.error("Error details:", error.message);
  } finally {
    // Exit the process
    process.exit();
  }
}

// Run the test
testConnection();
