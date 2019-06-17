const User = require("../models/User");
// const auth = require("../middlewares/auth");

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.addUser();
    res.status(201).send({ user });
  } catch (error) {
    res.status(500).send({ error, message: "Could not add the new user" });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const allUsers = await User.getAllUsers();
    res.send(allUsers);
  } catch (error) {
    res.status(500).send({ error, message: "Could not retrieve users" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.getUser(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error, message: "Could not get the user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user.updateUser();
    res.send(user);
  } catch (error) {
    res.status(500).send({ error, message: "Could not update the user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteUser(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error, message: "Could not delete the user" });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
