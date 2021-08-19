const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const Collection = require("./models/Collection");
require("./dbConnect");

app.use(cors());

app.get(`/`, (req, res) => {
  Collection.findOne({}, (err, data) => {
    if (err) {
      console.error(err.message);
    } else {
      const { movies } = data;
      console.log(JSON.stringify(movies, null, 2));
      res.status(200).send(movies);
    }
  });
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
