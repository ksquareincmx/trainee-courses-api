const assert = require("assert");

const insertDocument = (db, collectionName, newDocument, callback) => {
  const collection = db.collection(collectionName);

  collection.insertOne(newDocument, (err, res) => {
    if (err) {
      console.log("Cannot insert to DB");
      return callback(err);
    }

    console.log("Insertion succesfull!");
    return callback(res.ops);
  });
};

const findAllDocuments = (db, collectionName, callback) => {
  const collection = db.collection(collectionName);

  collection.find({}).toArray((err, res) => {
    if (err) {
      console.log("Cannot retrieve data from DB");
      return callback(err);
    }

    console.log("Found data!");
    return callback(res);
  });
};

/**
 * @return {Promise}
 */
const findDocument = (db, collectionName, id) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    collection.find({ _id: id }).toArray((err, res) => {
      if (err) {
        console.log("Could not find the record");
        return reject(err);
      }

      return resolve(res[0]);
    });
  });
};

// Updates documents
const updateDocument = (db, collectionName, id, updatedDocument, callback) => {
  const collection = db.collection(collectionName);
  const { name, email, admin, password, courses } = updatedDocument;

  collection.updateOne(
    { _id: id },
    { $set: { name, email, admin, password, courses } },
    (err, result) => {
      if (err) {
        console.log("Could not update the record");
        console.log(err);
        return callback(err);
      }

      console.log("Updated a record");
      callback(result);
    }
  );
};

const deleteDocument = (db, collectionName, id, callback) => {
  const collection = db.collection(collectionName);

  collection.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      console.log("Could not delete the record");
      console.log(err);
      return callback(err);
    }

    console.log("Deleted a record");
    callback(result);
  });
};

module.exports = {
  insertDocument,
  findAllDocuments,
  findDocument,
  updateDocument,
  deleteDocument
};
