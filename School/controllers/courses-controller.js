const coursesServices = require("../services/courses-services");

const addCourse = (req, res) => {
  coursesServices
    .addCourse(req.body)
    .then(course => {
      if (!course.upsertedCount) {
        return res.status(400).send({});
      }

      res.status(200).send({
        _id: course.upsertedId._id,
        ...req.body
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getAllCourses = (req, res) => {
  coursesServices
    .getAllCourses()
    .then(courses => {
      res.send(courses);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getCourse = (req, res) => {
  coursesServices
    .getCourse(req.params.id)
    .then(course => {
      res.send(course);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const updateCourse = (req, res) => {
  coursesServices
    .updateCourse(req.body)
    .then(course => {
      const result = course.modifiedCount ? req.body : {};
      res.send(result);
    })
    .catch(err => {
      res.status(500);
      res.send(err);
    });
};

const deleteCourse = (req, res) => {
  coursesServices
    .deleteCourse(req.params.id)
    .then(result => {
      const code = result.deletedCount ? 200 : 400;
      res.status(code).send({});
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse
};
