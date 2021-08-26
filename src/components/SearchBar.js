import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdInfo } from "react-icons/md";
import AuthContext from "../auth/AuthContext";

const SearchBar = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [inputUser, setInputUser] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const result = user.movies.movies;

      if (inputUser !== "") {
        setMovies(
          result.filter((m) =>
            m.title.toLowerCase().includes(inputUser.toLowerCase())
          )
        );
      } else {
        setMovies(result);
      }
    };
    fetchMovies();
  }, [inputUser]);

  return (
    <div className="flex flex-col w-full">
      <input
        type="text"
        value={inputUser}
        onChange={(e) => setInputUser(e.target.value)}
        placeholder="Rechercher un film"
        className="w-1/4 mx-auto mt-6 mb-8 pl-6 h-12 border border-blue-500 text-blue-600 font-medium rounded-full placeholder-blue-400"
      />
      {movies.length > 0 ? (
        <ul className="w-1/3 mx-auto">
          {movies.map((m) => (
            <li key={m._id}>
              <a
                href={`/movie/${m.title.trim().toLowerCase()}?year=${m.year}`}
                className="flex flex-row mb-2"
              >
                <p className="flex items-center justify-center w-16 h-6 mr-4 shadow-inner bg-gradient-to-br from-blue-800 to-blue-500 text-white text-center text-sm font-semibold rounded-xl">
                  {m.ref}
                </p>
                <p className="text-blue-700 font-light">
                  {m.title}
                  {m.year ? (
                    <span className="ml-1 font-medium text-sm">{`(${m.year})`}</span>
                  ) : undefined}
                </p>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center w-max mx-auto mt-60">
          <MdInfo className="w-6 mr-2 h-6 text-blue-800" />
          <p className="text-blue-600 text-sm font-semibold">
            {`Nous n'avons pas trouvé de films !`}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
