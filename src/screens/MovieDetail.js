import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import HeadBand from "../components/HeadBand/HeadBand";
import Pane from "../components/Pane/Pane";
import { getCookieFromBrowser } from "../auth/cookies";
import jwtDecode from "jwt-decode";
import LoadingPage from "./LoadingPage";

const MovieDetail = () => {
  const { isLoading, movies } = useContext(AuthContext);
  const { title } = useParams();
  const [detail, setDetail] = useState({});
  const [directors, setDirectors] = useState([]);
  const [compositors, setCompositors] = useState([]);
  const [cast, setCast] = useState([]);

  const token = getCookieFromBrowser("authToken");
  const user = jwtDecode(token);
  const year = new URLSearchParams(useLocation().search).get("year");

  const API_KEY = "aeeca3eb934c595a32cbd53a16f76f64";

  useEffect(() => {
    const fetchData = async () => {
      const movieFinded = movies.filter(
        (m) =>
          m.title.trim().toLowerCase() ===
            decodeURI(title).trim().toLowerCase() && m.year == year
      )[0];

      if (movieFinded) {
        const { results } = await axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURI(
              movieFinded.title.trim()
            )}&api_key=${API_KEY}&language=fr-FR&primary_release_year=${
              movieFinded.year
            }`
          )
          .then((res) => res.data)
          .catch((err) => console.error(err.message));

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

        const crew = await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=fr-FR`
          )
          .then((res) => res.data.crew)
          .catch((err) => console.error(err.message));

        movie.ref = movieFinded.ref;
        setDetail(movie);
        setDirectors(crew.filter((c) => c.job === "Director"));
        setCompositors(
          crew.filter(
            (c) => c.job === "Original Music Composer" || c.job === "Music"
          )
        );
        setCast(
          await axios
            .get(
              `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=fr-FR`
            )
            .then((res) => res.data.cast)
            .catch((err) => console.error(err.message))
        );
      }
    };
    fetchData();
  }, [title, movies]);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      {detail.title ? (
        <Helmet>
          <title>{`${detail.title} | Movie House`}</title>
        </Helmet>
      ) : undefined}
      <HeadBand>{{ detail, directors, compositors }}</HeadBand>
      <Pane>{{ detail, cast }}</Pane>
    </>
  );
};

export default MovieDetail;
