/**
 * Config file for tests
 */
/** @module confguration */
module.exports = {
  /** magazineKeepr backend configuration section */
  server: {
    /** HTTP port used by the server */
    port: 8000,
    /** url used by the server*/
    url: "http://localhost"
  },

  /** Database configuration section */
  database: {
    isMongoUnitDisabled: true,
    uri: "mongodb://localhost:27017/magazinekeeprTestdb"
  }
};
