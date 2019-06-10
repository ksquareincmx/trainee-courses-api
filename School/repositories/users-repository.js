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

const insertUser = async newUser => {
  try {
    const collection = db.collection(collectionName);
    const { name, email, admin, password, courses } = newUser;

    const user = await collection.updateOne(
      { email },
      { $set: { name, email, admin, password, courses } },
      { upsert: true }
    );

    return Promise.resolve(user);
  } catch (e) {
    return Promise.reject(e);
  }
};

const findAllUsers = async () => {
  try {
    const collection = db.collection(collectionName);

    const allUsers = await collection.find({}).toArray();

    return Promise.resolve(allUsers);
  } catch (e) {
    return Promise.reject(e);
  }
};

const findUser = async id => {
  try {
    const collection = db.collection(collectionName);
    const objId = new Mongo.ObjectID(id);

    const user = await collection.find({ _id: objId }).toArray();

    return Promise.resolve(user);
  } catch (e) {
    return Promise.reject(e);
  }
};

const updateUser = async updatedUser => {
  try {
    const collection = db.collection(collectionName);
    const { name, email, admin, password, courses } = updatedUser;
    const objId = new Mongo.ObjectID(updatedUser._id);

    const user = await collection.updateOne(
      { _id: objId },
      { $set: { name, email, admin, password, courses } }
    );

    return Promise.resolve(user);
  } catch (e) {
    return Promise.reject(e);
  }
};

const deleteUser = async id => {
  try {
    const collection = db.collection(collectionName);
    const objId = new Mongo.ObjectID(id);

    const user = await collection.findOneAndDelete({ _id: objId });

    return Promise.resolve(user);
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = {
  insertUser,
  findAllUsers,
  findUser,
  updateUser,
  deleteUser
};
