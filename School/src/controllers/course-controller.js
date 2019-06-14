const { Course } = require("../models/Course");

const addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.addCourse();
    res.status(201).send({ course });
  } catch (error) {
    res.status(500).send({ error, message: "Could not insert the new course" });
  }
};

const getAllCourses = async (_req, res) => {
  try {
    const allCourses = await Course.getAllCourses();
    res.send(allCourses);
  } catch (error) {
    res.status(500).send({ error, message: "Could not retrieve courses" });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.getCourse(req.params.id);
    res.send(course);
  } catch (error) {
    res.status(500).send({ error, message: "Could not get the course" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    course.updateCourse();
    res.send(course);
  } catch (error) {
    res.status(500).send({ error, message: "Could not update the course" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const result = await Course.deleteCourse(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error, message: "Could not delete the course" });
  }
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse
};
