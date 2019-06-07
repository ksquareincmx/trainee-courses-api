const express = require("express");
const userServices = require("./services/user-services");
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("<h1>Welcome to the School API!</h1>");
});

app.post("/api/users", (req, res) => {
  userServices
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
});

app.get("/api/users", (_req, res) => {
  userServices
    .getAllUsers()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/api/users/:id", (req, res) => {
  userServices
    .getUser(req.params.id)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put("/api/users/:id", (req, res) => {
  userServices
    .updateUser(req.body)
    .then(user => {
      const result = user.modifiedCount ? req.body : {};
      res.send(result);
    })
    .catch(err => {
      res.status(500);
      res.send(err);
    });
});

app.delete("/api/users/:id", (req, res) => {
  userServices
    .deleteUser(req.params.id)
    .then(result => {
      const code = result.deletedCount ? 200 : 400;
      res.status(code).send({});
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
