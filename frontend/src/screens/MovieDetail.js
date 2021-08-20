import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const MovieDetail = () => {
  const { title } = useParams();
  const [detail, setDetail] = useState({});
  const [directors, setDirectors] = useState([]);
  const [cast, setCast] = useState([]);

  const year = new URLSearchParams(useLocation().search).get("year");

  const API_KEY = "aeeca3eb934c595a32cbd53a16f76f64";

  useEffect(() => {
    const fetchData = async () => {
      const movies = await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${decodeURI(
            title
          )}&api_key=${API_KEY}&language=fr-FR&primary_release_year=${year}`
        )
        .then((res) => res.data.results)
        .catch((err) => console.error(err.message));

      const movieID = movies.filter(
        (m) =>
          m.original_title.toLowerCase() === decodeURI(title) ||
          m.title.toLowerCase() === decodeURI(title)
      )[0].id;

      setDetail(
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=fr-FR`
          )
          .then((res) => res.data)
          .catch((err) => console.error(err.message))
      );

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
  }, [title, year]);

  console.log(detail, directors, cast);

  return <p></p>;
};

export default MovieDetail;
