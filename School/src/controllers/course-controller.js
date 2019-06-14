const coursesServices = require("../services/courses-services");

const addCourse = async (req, res) => {
  try {
    const course = await coursesServices.addCourse(req.body);

    if (!course.upsertedCount) {
      return res.status(400).send({
        name: "MongoError",
        err: "The course already exist"
      });
    }

    res.send({
      _id: course.upsertedId._id,
      ...req.body
    });
  } catch (e) {
    const { name, err } = e;
    res.status(500).send({ name, err });
  }
};

const getAllCourses = async (_req, res) => {
  try {
    const allCourses = await coursesServices.getAllCourses();
    res.send(allCourses);
  } catch (e) {
    const { name, err } = e;
    res.status(500).send({ name, err });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await coursesServices.getCourse(req.params.id);
    res.send(course);
  } catch (e) {
    const { name, err } = e;
    res.status(500).send({ name, err });
  }
};

const updateCourse = async (req, res) => {
  try {
    await coursesServices.updateCourse(req.body);

    res.send(req.body);
  } catch (e) {
    const { name, err } = e;
    res.status(500).send({ name, err });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const result = await coursesServices.deleteCourse(req.params.id);

    if (!result.value) {
      return res.status(400).send({
        name: "MongoError",
        err: "Could not find the course to delete"
      });
    }

    res.send(result.value);
  } catch (e) {
    const { name, err } = e;
    res.status(500).send({ name, err });
  }
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse
};
