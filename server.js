const express = require("express");
const mongoose = require("mongoose");
const { default: connectDB } = require("./config/database");
const app = express();
const PORT = 3000;
connectDB();
app.get("/", (req, res) => {
  res.send("welcome to the port:", { PORT });
});

app.listen(PORT, () => {
  console.log("welcome to the server :");
});
