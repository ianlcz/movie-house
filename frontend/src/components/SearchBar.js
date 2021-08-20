import { useEffect, useState } from "react";
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
    <>
      <input
        type="text"
        value={inputUser}
        onChange={(e) => setInputUser(e.target.value)}
        placeholder="Rechercher un film"
        className="w-3/4 mx-44 mt-6 mb-8 pl-6 h-12 border border-green-500 text-green-600 text-center font-medium rounded-full placeholder-green-400"
      />
      <ul className="ml-4">
        {movies.map((m) => (
          <li key={m._id} className="flex flex-row mb-2">
            <p className="w-16 mr-4 bg-green-800 text-white text-center font-semibold rounded-xl">
              {m.ref}
            </p>
            <p className="text-green-700 font-light">{m.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchBar;
