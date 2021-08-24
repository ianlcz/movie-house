const express = require("express");
const cors = require("cors");
const fs = require("fs");
const server = express();
const bodyParser = require("body-parser");
const Collection = require("./models/Collection");
const Owner = require("./models/Owner");
const { collection } = require("./models/Collection");
const bcrypt = require("bcryptjs");
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

// Add User in Owner collection
server.post("/api/register", async (req, res) => {
  try {
    const { emailAddress, password, confirmPassword } = req.body;
    const owner = await Owner.findOne({ emailAddress });

    if (!owner && password === confirmPassword) {
      const movies = await Collection.create({});

      // Hash owner password
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (!err && hash) {
            await Owner.create(
              { emailAddress, password: hash, movies: movies._id },
              (err) => {
                if (err) throw new Error(err.message);
              }
            );
          }
        });
      });

      res
        .status(200)
        .json({ success: true, message: `A new user has been registered` });
    } else {
      res.json({
        success: false,
        message: "We didn't registered this new user !",
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

server.listen(5000, (err) => {
  if (err) throw err;
  console.log("Server started on http://localhost:5000");
});
