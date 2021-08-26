const express = require("express");
const cors = require("cors");
const fs = require("fs");
const server = express();
const bodyParser = require("body-parser");
const Collection = require("./models/Collection");
const Owner = require("./models/Owner");
const { collection } = require("./models/Collection");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
require("./dbConnect");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.get(`/api/`, (req, res) => {
  const { collectionId } = req.body;

  Collection.findOne({ _id: collectionId }, (err, data) => {
    if (!err) {
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
        .json({ success: true, message: "A new user has been registered" });
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

server.get("/api/account/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findOne({ _id: id }).populate({
      path: "movies",
      select: ["movies"],
    });

    if (owner) {
      res.status(200).json({ success: true, owner });
    } else {
      res.json({ success: false, message: "Owner not found !" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

server.post("/api/login", async (req, res) => {
  const { emailAddress, password } = req.body;
  try {
    const owner = await Owner.findOne({ emailAddress });

    if (owner) {
      bcrypt.compare(password, owner.password, async (err, result) => {
        if (!err && result) {
          const claims = { sub: owner._id, emailAddress };
          const token = sign(claims, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

          console.log(token);

          res.status(200).json({ success: true, token });
        } else {
          res.json({
            success: false,
            message: err.message,
          });
        }
      });
    } else {
      res.json({
        success: false,
        message: "Owner not found !",
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
