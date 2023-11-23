/**
 * Main application file.
 * @module app
 */

const express = require("express");
const { dbConnection } = require("./config/mongoConfig");
const counterRoutes = require("./routes/counterRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// DB Connection
dbConnection();

app.use(express.json());

app.use("/api/counter", counterRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`SERVER STARTED ON PORT ${port}`);
});
