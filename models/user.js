const mongoose = require("mongoose");
const Joi = require("joi");

const { courseSchema } = require("./course");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  role: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  courses: [courseSchema]
});

const Course = mongoose.model("Course", userSchema);

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validateCourse;
exports.userSchema = userSchema;
