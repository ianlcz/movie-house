import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IoInformationCircle, IoSyncCircle } from "react-icons/io5";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import List from "./Movie/List";

const SearchBar = () => {
  const { user, movies, isLoading } = useContext(AuthContext);
  const history = useHistory();
  const [result, setResult] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [code, setCode] = useState(0);

  useEffect(() => {
    if (userInput !== "" || code != 0) {
      setTimeout(() => {
        setResult(
          code != 0 && userInput === ""
            ? movies.filter((m) => (m.code ? m.code == code : undefined))
            : userInput !== "" && code != 0
            ? movies.filter((m) =>
                m.ref && m.title && m.code
                  ? (m.title.toLowerCase().includes(userInput.toLowerCase()) ||
                      m.ref.includes(userInput)) &&
                    m.code == code
                  : undefined
              )
            : movies.filter((m) =>
                m.ref && m.title && m.code
                  ? m.title.toLowerCase().includes(userInput.toLowerCase()) ||
                    m.ref.includes(userInput)
                  : undefined
              )
        );
      }, 1000);
    } else {
      setResult(movies);
    }
  }, [userInput, movies, code]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col lg:flex-row items-baseline w-5/6 lg:w-2/5 mx-auto my-8 justify-between">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Rechercher un film ou une référence"
          className="w-full lg:w-4/6 lg:mr-10 mb-4 lg:mb-0 pl-6 h-12 border border-blue-500 text-blue-600 font-medium rounded-full placeholder-blue-400"
        />

        <select
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-max mx-auto px-4 py-1 text-sm text-blue-400 appearance-none bg-white rounded-md border border-blue-300"
        >
          <option value={0}>Filtrer</option>
          <option value={1}>Vu</option>
          <option value={3}>Vu au cinéma mais pas revu</option>
          <option value={4}>Pas vu</option>
        </select>
      </div>

      {result.length > 0 ? (
        <>
          <ul className=" w-11/12 mx-auto grid grid-flow-cols grid-cols-1 lg:grid-cols-3 lg:gap-x-12 gap-y-3 lg:gap-y-6">
            {result.map((m) => (
              <List key={m.ref + " " + m.title} movie={m} />
            ))}
          </ul>
        </>
      ) : isLoading ? (
        <div className="flex items-center w-max mx-auto mt-60">
          <IoSyncCircle className="animate-spin w-6 mr-2 h-6 text-blue-800" />
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
