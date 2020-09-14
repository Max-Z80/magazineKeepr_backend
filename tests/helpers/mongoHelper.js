const mongoose = require("mongoose");
const Magazine = require("../../models/magazineModel");

/**
 * Drop the database
 */
exports.dropDatabase = () => {
  try {
    if (!global.config.database.isMongoUnitDisabled) {
      global.mongoUnit.drop();
    } else {
      mongoose.connect("mongodb://localhost:27017/magazinekeepr", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      // Drop the database before each tests on this 'describe' block and all sthe nested 'describe' blocks
      mongoose.connection.dropDatabase(console.log(" database dropped."));
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * pre-fills the Magazine collection with items. Assume the db is empty, with no collection
 * @param {string} collectionName name of the collection to fill
 * @param {Array} items items to be added to the db
 * @returns {Promise}
 */
exports.preFillMagazineCollection = items => {
  //   const connection = mongoose.connection;
  //   const collection = connection.collection(collectionName);

  return Magazine.insertMany(items);
};
