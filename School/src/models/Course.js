const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

courseSchema.methods.addCourse = async function() {
  const course = this;
  await course.save();
};

courseSchema.statics.getAllCourses = async () => {
  const courses = await Course.find({});
  if (courses.length === 0) {
    throw new Error();
  }
  return courses;
};

courseSchema.statics.getCourse = async id => {
  const course = await Course.findOne({ _id: id });
  if (!course) {
    throw new Error();
  }
  return course;
};

courseSchema.methods.updateCourse = async function() {
  const course = this;
  course.isNew = false;
  await course.save();
};

courseSchema.statics.deleteCourse = async id => {
  const result = await Course.deleteOne({ _id: id });
  if (!result.deletedCount) {
    throw new Error();
  }

  return result;
};

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course, courseSchema };
