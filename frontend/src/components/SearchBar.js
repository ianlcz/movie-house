import { useEffect, useState } from "react";
import { MdInfo } from "react-icons/md";
import axios from "axios";

const SearchBar = () => {
  const [movies, setMovies] = useState([]);
  const [inputUser, setInputUser] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await axios
        .get("http://localhost:8080")
        .then((res) => res.data)
        .catch((err) => console.error(err.message));

      if (inputUser !== "") {
        console.log("1");
        setMovies(
          result.filter((m) =>
            m.title.toLowerCase().includes(inputUser.toLowerCase())
          )
        );
      } else {
        console.log("2");
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
        className="w-1/4 mx-auto mt-6 mb-8 pl-6 h-12 border border-green-500 text-green-600 font-medium rounded-full placeholder-green-400"
      />
      {movies ? (
        <ul className="w-max mx-auto">
          {movies.map((m) => (
            <li key={m._id}>
              <a
                href={`/movie/${m.title.toLowerCase()}`}
                className="flex flex-row mb-2"
              >
                <p className="flex items-center justify-center w-16 h-6 mr-4 bg-green-800 text-white text-center text-sm font-semibold rounded-xl">
                  {m.ref}
                </p>
                <p className="text-green-700 font-light">{m.title}</p>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center w-max mx-auto mt-60">
          <MdInfo className="w-6 mr-2 h-6 text-green-800" />
          <p className="text-green-600 text-sm font-semibold">
            {`Nous n'avons pas trouvé de films !`}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
