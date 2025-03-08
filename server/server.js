const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const db = require("./connect/database");
const cartRouter = require("./routes/cart");
dotenv.config();
const PORT = process.env.PORT || 3000;

db.connect();
const app = express();

// Add middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// ROUTES
app.use("/api/users", require("./routes/users"));
app.use("/api/cart", cartRouter);
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.😎😎😎😎`);
});
