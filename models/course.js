const mongoose = require("mongoose");
const Joi = require("joi");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});

const Course = mongoose.model("Course", courseSchema);

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(course, schema);
}

async function validateIfExist(courses) {
  if (!courses) {
    return [];
  }

  let coursesPromises = courses.map(async element => {
    const course = await Course.findById(element.courseId);
    if (!course) {
      let error = {};
      error.details = [];
      error.details.push({ message: "Invalid course" });
      throw error;
    }
    const saveCourse = {
      _id: course._id,
      name: course.name
    };
    return saveCourse;
  });

  courses = await Promise.all(coursesPromises);
  return courses;
}

exports.Course = Course;
exports.validate = validateCourse;
exports.courseSchema = courseSchema;
exports.validateIfExist = validateIfExist;
