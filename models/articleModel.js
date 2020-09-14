const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const MagazineModel = require("./magazineModel");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ["memo", "file"],
      required: true
    },
    comment: {
      type: String
    },
    magazine: {
      type: Schema.Types.ObjectId,
      ref: MagazineModel
    }
  },
  { timestamps: true }
);

const articleModel = mongoose.model("Article", articleSchema);

module.exports = articleModel;
