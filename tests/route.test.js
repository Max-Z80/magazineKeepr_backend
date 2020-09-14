require("it-each")({ testPerIteration: true });
const mongoose = require("mongoose");
expect = require("chai").expect;

const resource = require("./resources/route.resource");
const { magazine1 } = require("./resources/magazines");

const {
  preFillMagazineCollection,
  dropDatabase
} = require("./helpers/mongoHelper");

describe("Tests the routes", () => {
  beforeEach(() => {
    dropDatabase();
  });
  describe("/article/add", () => {
    it.each(
      resource.createArticle.success,
      "[%s]",
      ["description"],
      async function(element, next) {
        const existingMagazines = await preFillMagazineCollection([magazine1]);

        global.gRequester
          .post("/article/add")
          .set("Content-Type", "application/json")
          .send({ article: element.article, magazine: element.magazine })
          .end((err, response) => {
            const createdArticle = response.body;
            expect(response.status).to.equal(200);
            testArticle(createdArticle, element.article);
            testMagazine(createdArticle.magazine, element.magazine);
            next();
          });
      }
    );
  });

  describe("/magazine/:magazineId/article/add", () => {
    it.each(
      resource.createArticleByMagazine.success,
      "[%s]",
      ["description"],
      async function(element, next) {
        const preFilledMagazines = await preFillMagazineCollection([magazine1]);
        const magazineId = preFilledMagazines[0]._id;

        global.gRequester
          .post(`/magazine/${magazineId}/article/add`)
          .set("Content-Type", "application/json")
          .send({ article: element.article })
          .end((err, response) => {
            const createdArticle = response.body;
            expect(response.status).to.equal(200);
            testArticle(createdArticle, element.article);
            testMagazine(createdArticle.magazine, preFilledMagazines[0]);
            next();
          });
      }
    );
  });
});

/**
 * Function which tests an article
 * @param {Article} actualArticle article to be tested
 * @param {Article} expectedArticle expected article
 */
function testArticle(actualArticle, expectedArticle) {
  expect(actualArticle.title).to.be.a("string");
  expect(actualArticle.title).to.equal(expectedArticle.title);
  expect(actualArticle.page).to.be.a("number");
  expect(actualArticle.page).to.equal(expectedArticle.page);
  expect(actualArticle.type).to.be.a("string");
  expect(actualArticle.type).to.equal(expectedArticle.type);
  expect(actualArticle.magazine).to.be.a("object");

  if (expectedArticle.comment) {
    expect(actualArticle.comment).to.be.a("string");
    expect(actualArticle.comment).to.equal(expectedArticle.comment);
  }
}

/**
 * Function which tests a magazine
 * @param {Magazine} actualMagazine magazine to be tested
 * @param {Magazine} expectedMagazine expected magazine
 */
function testMagazine(actualMagazine, expectedMagazine) {
  expect(actualMagazine.name).to.be.a("string");
  expect(actualMagazine.name).to.equal(expectedMagazine.name);
  expect(actualMagazine.issue).to.be.a("string");
  expect(actualMagazine.issue).to.equal(expectedMagazine.issue);
  expect(actualMagazine.location).to.be.a("string");
  expect(actualMagazine.location).to.equal(expectedMagazine.location);
}
