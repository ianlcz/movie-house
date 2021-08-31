const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");

/* Get a collection by owner.movies */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Collection.findById(id, (err, data) => {
    if (!err) {
      console.log(JSON.stringify(data, null, 2));
      res.status(200).send(data);
    }
  });
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ref, title, genre, year } = req.body;
    const today = new Date();
    const newMovie = {
      ref,
      title: title.toLowerCase(),
      genre,
      code: 1,
      purchaseYear: `${today.getUTCFullYear()} ${
        today.getUTCMonth() + 1 < 10
          ? "0" + (today.getUTCMonth() + 1)
          : today.getUTCMonth() + 1
      }`,
      year,
    };

    const { movies } = await Collection.findById(id);

    movies.push(newMovie);

    await Collection.updateOne(
      { _id: id },
      { $set: { movies: movies.sort((a, b) => Number(a.ref) - Number(b.ref)) } }
    );

    console.log(`INFO : Add movie (${title} - ${year}) in collection !`);

    res.status(200).json({
      success: true,
      message: `Le film (${title} - ${year}) a été ajouté à votre collection`,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/:id/:ref", async (req, res) => {
  try {
    const { id, ref } = req.params;

    const movies = await Collection.updateOne(
      { _id: id },
      { $pull: { movies: { ref: { $in: [ref] } } } }
    );

    console.log(`INFO : Delete movie in collection !`);

    res.status(200).json({
      success: true,
      movies,
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
