const { validateRole } = require("../middleware/validator");
const { User, validate } = require("../models/user");
const { Course } = require("../models/course");
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
  const multipleUsers = req.body.length;
  let users = [];
  let errors = [];
  let courses = [];
  multipleUsers ? (users = req.body) : users.push(req.body);

  let promises = _.map(users, async newUser => {
    const { error } = validate(newUser);
    if (error) {
      console.log("error 1");
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
    let coursesPromises = newUser.courses.map(async element => {
      const course = await Course.findById(element.courseId);
      if (!course) {
        let error = {};
        error.details = [];
        error.details.push({ message: "Invalid course" });
        errors.push(error);
        return;
      }
      const saveCourse = {
        _id: course._id,
        name: course.name
      };
      return saveCourse;
    });

    courses = await Promise.all(coursesPromises);
    console.log("courses", courses);

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
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const { name, role, email, password, courses } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, role, email, password, courses },
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
