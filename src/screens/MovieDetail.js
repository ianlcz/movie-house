import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import HeadBand from "../components/HeadBand/HeadBand";
import Pane from "../components/Pane/Pane";

const MovieDetail = () => {
  const { user } = useContext(AuthContext);
  const { title } = useParams();
  const [detail, setDetail] = useState({});
  const [directors, setDirectors] = useState([]);
  const [cast, setCast] = useState([]);
  const year = new URLSearchParams(useLocation().search).get("year");

  const API_KEY = "aeeca3eb934c595a32cbd53a16f76f64";

  console.log(user);

  const findMovie = async () => {
    const moviesInCollection = await axios
      .get("http://localhost:5000/api/", { collectionId: user.movies._id })
      .then((res) => res.data)
      .catch((err) => console.error(err.message));

    return moviesInCollection.filter(
      (m) =>
        m.title.trim().toLowerCase() ===
          decodeURI(title).trim().toLowerCase() && m.year == year
    )[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      const movieFinded = await findMovie();

      const results = await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURI(
            movieFinded.title.trim()
          )}&api_key=${API_KEY}&language=fr-FR&primary_release_year=${
            movieFinded.year
          }`
        )
        .then((res) => res.data.results)
        .catch((err) => console.error(err.message));

      console.log(movieFinded, results, results[0]);

      const moviesTMDB =
        movieFinded.year && results.length > 1
          ? results.filter(
              (m) =>
                m.title.trim().toLowerCase() ===
                movieFinded.title.trim().toLowerCase()
            )
          : results;

      const movieID = moviesTMDB[0].id;

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

  return (
    <>
      {detail.title ? (
        <Helmet>
          <title>{`${detail.title} | Movie House`}</title>
        </Helmet>
      ) : undefined}
      <HeadBand>{{ detail, directors }}</HeadBand>
      <Pane>{{ detail, cast }}</Pane>
    </>
  );
};

export default MovieDetail;
