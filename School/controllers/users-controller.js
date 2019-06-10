const usersServices = require("../services/users-services");

const addUser = async (req, res) => {
  try {
    const user = await usersServices.addUser(req.body);

    if (!user.upsertedCount) {
      return res.status(400).send({
        name: "MongoError",
        err: "The user already exists"
      });
    }

    res.send({
      _id: user.upsertedId._id,
      ...req.body
    });
  } catch (e) {
    const { name, err } = e;
    res.status(500).send({ name, err });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const allUsers = await usersServices.getAllUsers();
    res.send(allUsers);
  } catch (e) {
    const { name, err } = e;
    res.status(500).send({ name, err });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await usersServices.getUser(req.params.id);
    res.send(user);
  } catch (e) {
    const { name, err } = e;
    res.status(500).send({ name, err });
  }
};

const updateUser = async (req, res) => {
  try {
    await usersServices.updateUser(req.params.id);

    res.send(req.body);
  } catch (e) {
    const { name, err } = e;
    res.status(500).send({ name, err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await usersServices.deleteUser(req.params.id);

    if (!result.value) {
      return res.status(400).send({
        name: "MongoError",
        err: "Could not find the course to delete"
      });
    }

    res.send(result.value);
  } catch (e) {
    const { name, err } = e;
    res.status(500).send({ name, err });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
