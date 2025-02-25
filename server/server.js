const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/api/users", require("./routes/users"));

// Add middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.😎😎😎😎`);
});
