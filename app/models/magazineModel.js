const mongoose = require("mongoose");

const magazineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    issue: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const magazineModel = mongoose.model("Magazine", magazineSchema);

module.exports = magazineModel;
