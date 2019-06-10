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

const insertCourse = async newCourse => {
  try {
    const collection = db.collection(collectionName);
    const { name } = newCourse;

    const course = await collection.updateOne(
      { name },
      { $set: { name } },
      { upsert: true }
    );

    return Promise.resolve(course);
  } catch (e) {
    return Promise.reject(e);
  }
};

const findAllCourses = async () => {
  try {
    const collection = db.collection(collectionName);

    const allCourses = await collection.find({}).toArray();

    return Promise.resolve(allCourses);
  } catch (e) {
    return Promise.reject(e);
  }
};

const findCourse = async id => {
  try {
    const collection = db.collection(collectionName);
    const objId = new Mongo.ObjectID(id);

    const course = await collection.find({ _id: objId }).toArray();

    return Promise.resolve(course[0]);
  } catch (e) {
    return Promise.reject(e);
  }
};

const updateCourse = async updatedCourse => {
  try {
    const collection = db.collection(collectionName);
    const { name } = updatedCourse;
    const objId = new Mongo.ObjectID(updatedCourse._id);

    const course = await collection.updateOne(
      { _id: objId },
      { $set: { name } }
    );

    return Promise.resolve(course);
  } catch (e) {
    return Promise.reject(e);
  }
};

const deleteCourse = id => {
  try {
    const collection = db.collection(collectionName);
    const objId = new Mongo.ObjectID(id);

    const result = collection.findOneAndDelete({ _id: objId });

    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = {
  insertCourse,
  findAllCourses,
  findCourse,
  updateCourse,
  deleteCourse
};
