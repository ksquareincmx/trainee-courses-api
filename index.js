const courses = require("./routes/courses");
const users = require("./routes/users");
const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
Joi.objectId = require("joi-objectid")(Joi);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const dbString = "mongodb://localhost:27017/coursesAPI";

mongoose
  .connect(dbString, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 5010;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
    return;
  })
  .catch(err => {
    console.error("Could not connect to MongoDB...", err);
    throw err;
  });

app.use(express.json());
app.use("/api/courses", courses);
app.use("/api/users", users);
