const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    owner: mongoose.SchemaTypes.ObjectId,
    movies: mongoose.SchemaTypes.Array,
  },
  {
    collection: "Collection",
  }
);

const Collection = mongoose.model("collection", CollectionSchema);

module.exports = Collection;
