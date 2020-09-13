const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["memo", "file"],
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const articleModel = mongoose.model("Article", articleSchema);

module.exports = articleModel;
