/* Configuration */
const port = 8000;
/* ------------- */

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/magazinekeepr", {
  useNewUrlParser: true,
});

const article = require("./models/articleModel");

const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Welcome to magasinekeepr!");
});

/** List all articles found in the DB. (that(s for a start)) */
app.get("/articles", (req, res) => {
  article.find().then(
    (articles) => {
      res.send(articles);
    },
    () => {
      res.send("problem in the API /articles");
    }
  );
});

/** Find articles according to criteria */
app.post("/articles/find", (req, res) => {
  res.send("");
});

/** Create an article */
app.post("/article/add", (req, res) => {
  console.log(req.body);
  const a = new article(req.body);
  a.save(req.body).then(
    (createdArticle) => {
      res.send(createdArticle);
    },
    () => {}
  );
});

/** Update a given article */
app.post("article/:articleId/update", (req, res) => {
  res.send("");
});

app.listen(port, () => {
  console.log("Server magasinekeepr started successfully");
});
