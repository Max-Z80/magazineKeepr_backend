/* Configuration */
const port = 8000;
/* ------------- */

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/magazinekeepr", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const article = require("./models/articleModel");
const { createArticleAndMagazine } = require("./controllers/articleController");

const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors({ origin: "*" }));

try {
  require("./routes.js")(app);
  console.log("Routes loaded successfully");
} catch {
  console.error("Routes not loaded.");
}

app.listen(port, () => {
  console.log("Server magasinekeepr started successfully");
});

module.exports = app;
