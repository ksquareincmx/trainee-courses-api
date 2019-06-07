const db = require("../controllers/users-repository");

const addUser = user => {
  return db.insertUser(user);
};

const getAllUsers = () => {
  return db.findAllUsers();
};

const getUser = id => {
  return db.findUser(id);
};

const updateUser = updatedUser => {
  return db.updateUser(updatedUser);
};

const deleteUser = id => {
  return db.deleteUser(id);
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
