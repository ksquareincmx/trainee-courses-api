const { Router } = require("express");
const usersController = require("../controllers/users-controller");
const usersRouter = Router();

usersRouter.post("/", usersController.addUser);

usersRouter.get("/", usersController.getAllUsers);

usersRouter.get("/:id", usersController.getUser);

usersRouter.put("/:id", usersController.updateUser);

usersRouter.delete("/:id", usersController.deleteUser);

module.exports = usersRouter;
