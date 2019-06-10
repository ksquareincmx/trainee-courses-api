const Mongo = require("mongodb");
const MongoClient = Mongo.MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, { useNewUrlParser: true });

const dbName = "SchoolAPI";
const collectionName = "Courses";

let db;

client.connect(err => {
  if (err) console.log("Could not connect to DB");
  console.log("Successfully connected to DB");
  db = client.db(dbName);
});

const insertCourse = newCourse => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    const { name } = newCourse;

    collection.updateOne(
      { name },
      { $set: { name } },
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

const findAllCourses = () => {
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

const findCourse = id => {
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

const updateCourse = updatedCourse => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    const { name } = updatedCourse;
    const objId = new Mongo.ObjectID(updatedCourse._id);

    collection.updateOne({ _id: objId }, { $set: { name } }, (err, result) => {
      if (err) {
        console.log("Could not update the record");
        return reject(err);
      }

      resolve(result);
    });
  });
};

const deleteCourse = id => {
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
  insertCourse,
  findAllCourses,
  findCourse,
  updateCourse,
  deleteCourse
};
