const db = require("../repositories/courses-repository");

const addCourse = course => {
  return db.insertCourse(course);
};

const getAllCourses = () => {
  return db.findAllCourses();
};

const getCourse = id => {
  return db.findCourse(id);
};

const updateCourse = updatedCourse => {
  return db.updateCourse(updatedCourse);
};

const deleteCourse = id => {
  return db.deleteCourse(id);
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse
};
