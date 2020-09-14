const {
  findArticlesEndPoint,
  createArticleAndMagazineEndPoint,
  createArticleByMagazineEndPoint
} = require("./controllers/articleController");

/** Module containing all the routes for magazinekeepr */
module.exports = app => {
  app.get("/", (req, res) => {
    res.send("Welcome to magazinekeepr!");
  });

  /** List all articles found in the DB. (that(s for a start)) */
  app.get("/articles", findArticlesEndPoint);

  /** Find articles according to criteria */
  //   app.post("/articles/find", (req, res) => {
  //     res.send("");
  //   });

  /** Create an article and a magazine*/
  app.post("/article/add", createArticleAndMagazineEndPoint);

  /** Create an article for a given exisiting magazine */
  app.post(
    "/magazine/:magazineId/article/add",
    createArticleByMagazineEndPoint
  );

  /** Update a given article */
  app.post("article/:articleId/update", (req, res) => {
    res.send("");
  });
};
