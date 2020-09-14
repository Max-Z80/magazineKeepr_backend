const { magazine1 } = require("./magazines");

module.exports = {
  createArticle: {
    success: [
      {
        description: "create an article and magazine, magazine does not exist",
        article: { title: "title", page: 1, type: "memo" },
        magazine: { name: "rustica", issue: "1234", location: "cupboard" }
      },
      {
        description: "create an article and magazine, magazine exists",
        article: { title: "title", page: 1, type: "memo" },
        magazine: magazine1
      }
    ]
  },
  createArticleByMagazine: {
    success: [
      {
        description: "create an article, magazine already exists in db",
        article: { title: "title", page: 1, type: "memo" }
      }
    ]
  }
};
