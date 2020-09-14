const Magazine = require("../models/magazineModel.js");

/**
 * Create a magazine
 * @param {magazine} magasine to be created
 * @returns {Promise}
 */
exports.createMagazine = magazine => {
  let magasineDocument = new Magazine(magazine);
  return magasineDocument.save().then(createdMagazine => {
    console.log(
      "Magazine created successfully",
      { name: magazine.name },
      { issue: magazine.issue }
    );

    return createdMagazine;
  });
};

/**
 * Find a magazine by its identifier
 * @param {*} magazineId magazine identifier
 * @returns {Promise}
 */
function findMagazineById(magazineId) {
  return Magazine.findById(magazineId);
}

/**
 * Find a magazine by name and issue
 * @param {Magazine} magazine
 * @returns {Promise}
 */
exports.findMagazineByNameAndIssue = magazine => {
  if (magazine.name && magazine.issue) {
    return Magazine.find({ name: magazine.name, issue: magazine.issue });
  } else {
    return Promise.reject(
      "missing properties name and/or issue for finding magazines by name and issue"
    );
  }
};
