const { validateRole } = require("../middleware/validator");
const { Course, validate } = require("../models/course");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find().sort("name");
  res.send(courses);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).send("The course with the given ID was not found");
  }

  res.send(course);
});

router.get("/:id/users", async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).send("The course with the given ID was not found");
  }

  if (req.user.role === "admin") {
    let users = await User.find({
      courses: { _id: req.params.id, name: course.name }
    });
    return res.send(users);
  } else {
    let isEnrolled = await User.find({
      email: req.user.email,
      courses: { _id: req.params.id, name: course.name }
    }).select("courses -_id");

    if (isEnrolled.length > 0) {
      let users = await User.find({
        courses: { _id: req.params.id, name: course.name }
      });

      res.send(users);
    } else {
      res.send("Acces denied. You are not enrolled in this course");
    }
  }
});

router.post("/", validateRole, async (req, res) => {
  const role = req.headers.authorization
    ? req.headers.authorization.toLowerCase()
    : null;

  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let course = new Course({ name: req.body.name });
  course = await course.save();
  res.send(course);
});

router.put("/:id", async (req, res) => {
  const role = req.headers.authorization
    ? req.headers.authorization.toLowerCase()
    : null;

  if (role !== "admin") {
    return res.status(403).send("Invalid credentials to update a course");
  }

  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!course) {
    return res.status(404).send("The course with the given ID was not found");
  }

  res.send(course);
});

router.delete("/:id", async (req, res) => {
  const role = req.headers.authorization
    ? req.headers.authorization.toLowerCase()
    : null;

  if (role !== "admin") {
    return res.status(403).send("Invalid credentials to delete a course");
  }

  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course) {
    return res.status(404).send("The course with the given ID was not found");
  }

  res.send(course);
});

module.exports = router;
