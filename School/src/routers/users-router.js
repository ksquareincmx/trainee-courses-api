const { Router } = require("express");
const controller = require("../controllers/user-controller");
const router = Router();

router.post("/", controller.addUser);

router.get("/", controller.getAllUsers);

router.get("/:id", controller.getUser);

router.put("/:id", controller.updateUser);

router.delete("/:id", controller.deleteUser);

// router.post("/login", controller.login);

module.exports = router;
