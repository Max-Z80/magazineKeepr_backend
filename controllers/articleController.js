const {
  createMagazine,
  findMagazineByNameAndIssue
} = require("./magazineController");
const Article = require("../models/articleModel.js");
const mongoose = require("mongoose");

exports.findArticlesEndPoint = (req, res) => {
  Article.find().then(
    articles => {
      res.send(articles);
    },
    () => {
      res.send("problem in the API /articles");
    }
  );
};

exports.createArticleAndMagazineEndPoint = (req, res) => {
  let { article, magazine } = req.body;
  console.log(
    "Request on /article/add. Payload is: ",
    { article },
    { magazine }
  );

  createArticleAndMagazine(article, magazine).then(createdArticle => {
    res.send(createdArticle);
  });
};

exports.createArticleByMagazineEndPoint = (req, res) => {
  let magazineId = req.params.magazineId;
  let { article } = req.body;

  createArticleByMagazineId(article, magazineId).then(createdArticle => {
    res.send(createdArticle);
  });
};

/**
 * Create an article for a new magazine. When the magazine does not exist yet, it is created first.
 * @param {Article} article article to create . It is already validated
 * @param {Magazine} magazine magazine where the article is. It is already validated
 * @returns { Promise}
 */
async function createArticleAndMagazine(article, magazine) {
  // Check that the magazine does not exist yet
  const foundMagazine = await findMagazineByNameAndIssue(magazine);
  if (foundMagazine.length !== 0) {
    return createArticleByMagazineId(article, foundMagazine[0]._id);
  }

  // magazine does not exist
  return createMagazine(magazine).then(newMagazine =>
    createArticleByMagazineId(article, newMagazine._id)
  );
}

/**
 * Create an article in an existing magazine
 * @param {Article} article article to create
 * @param {string} magazineId magazine identifier
 * @returns {Promise} the article populated with the magazine
 */
async function createArticleByMagazineId(article, magazineId) {
  article.magazine = mongoose.Types.ObjectId(magazineId);
  let articleDocument = new Article(article);

  await articleDocument.save();
  return await articleDocument.populate("magazine").execPopulate();
}
