const { Pool } = require("pg");

// Configure connection with your specific database details
const pool = new Pool({
  user: process.env.DB_USER || "quirkmart", // Database owner
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "quirkmart_dev", // Database name
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
});

// Define the connection function
const connectDB = () => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Database connection error", err.stack);
    } else {
      console.log("Database connected successfully to quirkmart_dev");
    }
  });
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: connectDB,
};
