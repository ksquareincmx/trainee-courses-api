const { Router } = require("express");
const coursesController = require("../controllers/course-controller");
const coursesRouter = Router();

coursesRouter.post("/", coursesController.addCourse);

coursesRouter.get("/", coursesController.getAllCourses);

coursesRouter.get("/:id", coursesController.getCourse);

coursesRouter.put("/:id", coursesController.updateCourse);

coursesRouter.delete("/:id", coursesController.deleteCourse);

module.exports = coursesRouter;
