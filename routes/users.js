const { validateRole } = require("../middleware/validator");
const { User, validate } = require("../models/user");
const { validateIfExist: validateUserCourses } = require("../models/course");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).send("The user with the given ID was not found");
  }

  res.send(user);
});

router.post("/", validateRole, async (req, res) => {
  let users = [];
  let errors = [];
  let courses = [];
  const multipleUsers = req.body.length;
  multipleUsers ? (users = req.body) : users.push(req.body);

  let promises = _.map(users, async newUser => {
    const { error } = validate(newUser);
    if (error) {
      console.log("Error on user format");
      errors.push(error);
      return;
    }
    let user = await User.findOne({ email: newUser.email });
    if (user) {
      let error = {};
      error.details = [];
      error.details.push({ message: "User already registered" });
      errors.push(error);
      return;
    }

    //validate courses
    try {
      courses = await validateUserCourses(newUser.courses);
    } catch (error) {
      errors.push(error);
    }

    const { name, role, email, password } = newUser;
    user = await new User({
      name,
      role,
      email,
      password,
      courses: courses
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return user;
  });

  users = await Promise.all(promises);

  if (errors.length >= 1) {
    return res.status(400).send(errors[0].details[0].message);
  }

  await User.insertMany(users);
  res.send(`Inserted ${users.length} users in the database`);
});

router.put("/:id", validateRole, async (req, res) => {
  let saveCourses = [];
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const { name, role, email, password, courses } = req.body;

  try {
    saveCourses = await validateUserCourses(courses);
  } catch (error) {
    return res.status(400).send(error);
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, role, email, password, courses: saveCourses },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found");

  res.send(user);
});

router.delete("/:id", validateRole, async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found");

  res.send(user);
});

module.exports = router;
