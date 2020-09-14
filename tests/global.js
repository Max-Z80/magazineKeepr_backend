global.chai = require("chai");
global.expect = require("chai").expect;
global.chaiHttp = require("chai-http");
global.chai.use(chaiHttp);
global.mongoUnit = require("mongo-unit");

process.env.NODE_ENV = "test";

global.config = require("./config/server.config.js");

before(function(done) {
  if (!config.database.isMongoUnitDisabled) {
    // starts a mongodb instance which will stay in memory
    try {
      global.mongoUnit
        .start({
          // verbose: true
        })
        .then(mongoUri => {
          console.log("Started mongoDB for all tests. URI is : " + mongoUri);
          process.env.MONGO_URI = mongoUri;

          //initialize the server
          global.gServer = require("../server.js");
        })
        .catch(e => {
          console.log("Could not start the server for tests.");
          console.log(e);
          done();
        });
    } catch (e) {
      console.log("Could not start the mongo instance for tests.");
      console.log(e);
      done();
    }
  } else {
    console.log("using mongoDB running locally at %s", config.database.uri);
    global.gServer = require("../server.js");
    global.gRequester = chai.request(global.gServer).keepOpen();
    setTimeout(function() {
      done();
    }, 5000);
  }
});

after(() => {
  global.gRequester.close();
  console.log("Server is closed");
  //global.mongoUnit.stop();
  console.log("Mongo-unit is stopped.");
});
