const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const Collection = require("./models/Collection");
const PORT = process.env.PORT || 5000;

const privateKey = fs.readFileSync("../certificates/localhost.key", "utf8");
const certificate = fs.readFileSync("../certificates/localhost.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);
require("./dbConnect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

httpsServer.listen(PORT, () => console.log(`listening on port ${PORT}`));
