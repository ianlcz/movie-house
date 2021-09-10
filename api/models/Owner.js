const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema(
  {
    emailAddress: { type: mongoose.SchemaTypes.String, unique: true },
    password: mongoose.SchemaTypes.String,
    movies: { type: mongoose.Schema.Types.ObjectId, ref: "collection" },
  },
  {
    collection: "Owner",
  }
);

const Owner = mongoose.model("owner", OwnerSchema);

module.exports = Owner;
