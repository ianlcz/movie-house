import axios from "axios";
import { useEffect, useState } from "react";

const List = ({ movie }) => {
  const [movieInfo, setMovieInfo] = useState({});
  const API_KEY = "aeeca3eb934c595a32cbd53a16f76f64";

  useEffect(() => {
    const fetchData = async () => {
      const { results } = await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${movie.title.trim()}&api_key=${API_KEY}&language=fr-FR&primary_release_year=${
            movie.year
          }`
        )
        .then((res) => res.data)
        .catch((err) => console.error(err.message));

      const moviesTMDB =
        movie.year && results.length > 1
          ? results.filter(
              (m) =>
                m.title.trim().toLowerCase() ===
                movie.title.trim().toLowerCase()
            )
          : results;

      if (moviesTMDB[0]) {
        const movieID = moviesTMDB[0].id;

        const data = await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=fr-FR`
          )
          .then((res) => res.data)
          .catch((err) => console.error(err.message));

        setMovieInfo(data);
      } else {
        console.log(movie);
      }
    };
    fetchData();
  }, [movie]);

  return (
    <li key={movieInfo.id}>
      <a
        href={`/movie/${movie.title.trim().toLowerCase()}?year=${movie.year}`}
        className="flex flex-row items-center mb-2"
      >
        <p className="flex items-center justify-center w-16 h-6 mr-4 shadow-inner bg-gradient-to-br from-blue-800 to-blue-500 text-white text-center text-sm font-semibold rounded-xl">
          {movie.ref}
        </p>
        <div>
          <p className="text-blue-700 font-light">
            {movieInfo.title || movie.title}
            {movie.year ? (
              <span className="ml-1 font-medium text-sm">{`(${movie.year})`}</span>
            ) : undefined}
          </p>
          <p className="text-blue-700 text-xs">{`Code : ${movie.code}`}</p>
        </div>
      </a>
    </li>
  );
};

export default List;
