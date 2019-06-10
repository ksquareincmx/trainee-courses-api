const Mongo = require("mongodb");
const MongoClient = Mongo.MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, { useNewUrlParser: true });

const dbName = "SchoolAPI";
const collectionName = "Users";

let db;

client.connect(err => {
  if (err) console.log("Could not connect to DB");
  console.log("Successfully connected to DB");
  db = client.db(dbName);
});

const insertUser = newUser => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    const { name, email, admin, password, courses } = newUser;

    collection.updateOne(
      { email },
      { $set: { name, email, admin, password, courses } },
      { upsert: true },
      (err, res) => {
        if (err) {
          console.log("Cannot insert to DB");
          return reject(err);
        }

        return resolve(res);
      }
    );
  });
};

const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);

    collection.find({}).toArray((err, res) => {
      if (err) {
        console.log("Cannot retrieve data from DB");
        return reject(err);
      }

      return resolve(res);
    });
  });
};

const findUser = id => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    const objId = new Mongo.ObjectID(id);

    collection.find({ _id: objId }).toArray((err, res) => {
      if (err) {
        console.log("Cannot retrieve data from DB");
        return reject(err);
      }

      return resolve(res[0]);
    });
  });
};

const updateUser = updatedUser => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    const { name, email, admin, password, courses } = updatedUser;
    const objId = new Mongo.ObjectID(updatedUser._id);

    collection.updateOne(
      { _id: objId },
      { $set: { name, email, admin, password, courses } },
      (err, result) => {
        if (err) {
          console.log("Could not update the record");
          return reject(err);
        }

        resolve(result);
      }
    );
  });
};

const deleteUser = id => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    const objId = new Mongo.ObjectID(id);

    collection.deleteOne({ _id: objId }, (err, result) => {
      if (err) {
        console.log("Could not delete the record");
        return reject(err);
      }

      resolve(result);
    });
  });
};

module.exports = {
  insertUser,
  findAllUsers,
  findUser,
  updateUser,
  deleteUser
};
