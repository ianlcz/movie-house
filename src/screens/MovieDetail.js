import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeadBand from "../components/HeadBand/HeadBand";
import Pane from "../components/Pane/Pane";

const MovieDetail = () => {
  const { title } = useParams();
  const [detail, setDetail] = useState({});
  const [directors, setDirectors] = useState([]);
  const [cast, setCast] = useState([]);

  const API_KEY = "aeeca3eb934c595a32cbd53a16f76f64";

  const findMovie = async () => {
    const moviesInCollection = await axios
      .get("https://localhost:5000")
      .then((res) => res.data)
      .catch((err) => console.error(err.message));

    return moviesInCollection.filter((m) => m.title === decodeURI(title))[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      const movieFinded = await findMovie();

      const moviesTMDB = await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${movieFinded.title}&api_key=${API_KEY}&language=fr-FR&primary_release_year=${movieFinded.year}`
        )
        .then((res) => res.data.results)
        .catch((err) => console.error(err.message));

      const movieID = moviesTMDB.filter(
        (m) =>
          m.original_title.toLowerCase() === movieFinded.title.toLowerCase() ||
          m.title.toLowerCase() === movieFinded.title.toLowerCase()
      )[0].id;

      const movie = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=fr-FR`
        )
        .then((res) => res.data)
        .catch((err) => console.error(err.message));

      movie.ref = movieFinded.ref;

      setDetail(movie);

      const crew = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=fr-FR`
        )
        .then((res) => res.data.crew)
        .catch((err) => console.error(err.message));

      setDirectors(crew.filter((c) => c.job === "Director"));

      setCast(
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=fr-FR`
          )
          .then((res) => res.data.cast)
          .catch((err) => console.error(err.message))
      );
    };
    fetchData();
  }, [title]);

  console.log(detail, cast);

  return (
    <>
      <HeadBand>{{ detail, directors }}</HeadBand>
      <Pane />
    </>
  );
};

export default MovieDetail;
