const express = require("express");
const courses = require("../routes/courses");
const users = require("../routes/users");
const auth = require("../routes/auth");
const authToken = require("../middleware/auth");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/courses", authToken, courses);
  app.use("/api/users", authToken, users);
};
