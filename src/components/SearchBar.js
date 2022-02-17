import { useContext, useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { IoInformationCircle, IoSyncCircle } from "react-icons/io5";
import AuthContext from "../auth/AuthContext";
import List from "./Movie/List";
import TitlePage from "./TitlePage";
import Actions from "./Actions";
import Suggestions from "./Suggestions";

const SearchBar = () => {
  const { user, movies } = useContext(AuthContext);
  const navigate = useNavigate();
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
                  : undefined,
              )
            : movies.filter((m) =>
                m.ref && m.title && m.code
                  ? m.title.toLowerCase().includes(userInput.toLowerCase()) ||
                    m.ref.includes(userInput)
                  : undefined,
              ),
        );
      }, 1000);
    } else {
      setResult(movies);
    }
  }, [userInput, movies, code]);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col w-11/12 lg:w-1/2 items-center mt-6 py-6 bg-green-800 bg-opacity-60 shadow-md backdrop-filter backdrop-blur-xl rounded-2xl z-30 fixed">
          <TitlePage />
          <Actions />

          <div className="flex flex-col lg:flex-row items-baseline w-4/5 mx-auto mt-6 mb-3 justify-between">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Rechercher un film ou une référence"
              className="w-full lg:w-5/6 lg:mr-10 mb-4 lg:mb-0 pl-6 h-12 border border-green-500 text-green-600 font-medium text-sm lg:text-base rounded-full shadow-inner placeholder-green-400"
            />

            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-max mx-auto px-4 py-1 text-sm text-green-400 appearance-none bg-white rounded-md border border-green-300"
            >
              <option value={0}>Filtrer</option>
              <option value={1}>Vu</option>
              <option value={3}>Vu au cinéma mais pas revu</option>
              <option value={4}>Pas vu</option>
            </select>
          </div>
        </div>
      </div>

      <Suggestions result={result} />
    </>
  );
};

export default SearchBar;
