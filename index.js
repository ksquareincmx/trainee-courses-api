//require("dotenv").config();

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const courses = require("./routes/courses");

const dbString = "mongodb://localhost:27017/coursesAPI";

mongoose
  .connect(dbString, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return;
  })
  .catch(err => {
    console.error("Could not connect to MongoDB...", err);
    throw err;
  });

app.use(express.json());
app.use("/api/courses", courses);

const port = process.env.PORT || 5010;
app.listen(port, () => console.log(`Listening on port ${port}...`));
