const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    movies: { type: mongoose.SchemaTypes.Array, default: [] },
  },
  {
    collection: "Collection",
  }
);

const Collection = mongoose.model("collection", CollectionSchema);

module.exports = Collection;
