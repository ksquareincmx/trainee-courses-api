const { Router } = require("express");
const controller = require("../controllers/course-controller");
const router = Router();

router.post("/", controller.addCourse);

router.get("/", controller.getAllCourses);

router.get("/:id", controller.getCourse);

router.put("/:id", controller.updateCourse);

router.delete("/:id", controller.deleteCourse);

module.exports = router;
