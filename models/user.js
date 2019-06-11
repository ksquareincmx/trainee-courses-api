const mongoose = require("mongoose");
const Joi = require("joi");

const { Course, courseSchema } = require("./course");

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
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    minlength: 3,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  courses: [courseSchema]
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const courses = Joi.object().keys({
    courseId: Joi.objectId().required()
  });
  const schema = {
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    role: Joi.string()
      .min(3)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required(),
    courses: Joi.array().items(courses)
  };

  return Joi.validate(user, schema);
}

async function validateUserCourses(courses) {
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

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
exports.validateUserCourses = validateUserCourses;
