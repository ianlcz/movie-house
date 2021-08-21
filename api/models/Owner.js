const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema(
  {
    lastname: mongoose.SchemaTypes.String,
    firstname: mongoose.SchemaTypes.String,
    emailAddress: mongoose.SchemaTypes.String,
    password: mongoose.SchemaTypes.String,
    collection: mongoose.SchemaTypes.ObjectId,
  },
  {
    collection: "Owner",
  }
);

const Owner = mongoose.model("owner", OwnerSchema);

module.exports = Owner;
