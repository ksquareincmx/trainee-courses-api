const usersServices = require("../services/users-services");

const addUser = (req, res) => {
  usersServices
    .addUser(req.body)
    .then(user => {
      if (!user.upsertedCount) {
        return res.status(400).send({});
      }

      res.status(200).send({
        _id: user.upsertedId._id,
        ...req.body
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getAllUsers = (req, res) => {
  usersServices
    .getAllUsers()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getUser = (req, res) => {
  usersServices
    .getUser(req.params.id)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const updateUser = (req, res) => {
  usersServices
    .updateUser(req.body)
    .then(user => {
      const result = user.modifiedCount ? req.body : {};
      res.send(result);
    })
    .catch(err => {
      res.status(500);
      res.send(err);
    });
};

const deleteUser = (req, res) => {
  usersServices
    .deleteUser(req.params.id)
    .then(result => {
      const code = result.deletedCount ? 200 : 400;
      res.status(code).send({});
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
