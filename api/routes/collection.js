const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");

/* Get a collection by owner.movies */
router.get(`/:id`, (req, res) => {
  const { id } = req.params;

  Collection.findOne({ _id: id }, (err, data) => {
    if (!err) {
      console.log(JSON.stringify(data, null, 2));
      res.status(200).send(data);
    }
  });
});

module.exports = router;
