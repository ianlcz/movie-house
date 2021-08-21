const express = require("express");
const cors = require("cors");
const fs = require("fs");
const server = express();
const bodyParser = require("body-parser");
const Collection = require("./models/Collection");
require("./dbConnect");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.get(`/api/`, (req, res) => {
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

server.listen(5000, (err) => {
  if (err) throw err;
  console.log("Server started on http://localhost:5000");
});
