require("dotenv").config();

const express = require("express");
const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on: localhost:${PORT}`);
});
