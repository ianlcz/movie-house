import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IoInformationCircle, IoSyncCircle } from "react-icons/io5";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import Actions from "./Actions";

const SearchBar = () => {
  const { user, movies, isLoading } = useContext(AuthContext);
  const history = useHistory();
  const [result, setResult] = useState([]);
  const [inputUser, setInputUser] = useState("");

  useEffect(() => {
    const fetchMovies = () => {
      if (inputUser) {
        setResult(
          movies.filter((m) =>
            m.title
              ? m.title.toLowerCase().includes(inputUser.toLowerCase())
              : undefined
          )
        );
      } else {
        setResult(movies);
      }
    };
    fetchMovies();
  }, [inputUser, movies]);

  return (
    <div className="flex flex-col w-full">
      <input
        type="text"
        value={inputUser}
        onChange={(e) => setInputUser(e.target.value)}
        placeholder="Rechercher un film"
        className="w-1/4 mx-auto mt-8 pl-6 h-12 border border-blue-500 text-blue-600 font-medium rounded-full placeholder-blue-400"
      />

      {result.length > 0 ? (
        <>
          <Actions />
          <ul className="flex flex-col w-2/3 mx-auto">
            {result.map((m) => (
              <li key={m._id}>
                <a
                  href={`/movie/${m.title}?year=${m.year}`}
                  className="flex flex-row items-center mb-2"
                >
                  <p className="flex items-center justify-center w-16 h-6 mr-4 shadow-inner bg-gradient-to-br from-blue-800 to-blue-500 text-white text-center text-sm font-semibold rounded-xl">
                    {m.ref}
                  </p>
                  <div>
                    <p className="text-blue-700 font-light">
                      {m.title}
                      {m.year ? (
                        <span className="ml-1 font-medium text-sm">{`(${m.year})`}</span>
                      ) : undefined}
                    </p>
                    <p className="text-blue-700 text-xs">{`Code : ${m.code}`}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : isLoading ? (
        <div className="flex items-center w-max mx-auto mt-60">
          <IoSyncCircle className="w-6 mr-2 h-6 text-blue-800" />
          <p className="text-blue-800 text-sm font-semibold">
            Récupération de vos films...
          </p>
        </div>
      ) : (
        <div className="flex items-center w-max mx-auto mt-60">
          <IoInformationCircle className="w-6 mr-2 h-6 text-blue-800" />
          <p className="text-blue-800 text-sm font-semibold">
            {`Nous n'avons pas trouvé de films !`}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
