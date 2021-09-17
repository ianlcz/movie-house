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

  const codeEquivalent = [
    { code: 1, label: "Vu" },
    { code: 3, label: "Vu au cinéma mais pas revu" },
    { code: 4, label: "Pas vu" },
    { code: 5, label: "Souhait" },
  ];

  useEffect(() => {
    if (userInput !== "") {
      setResult(
        movies.filter((m) =>
          m.ref && m.title
            ? m.title.toLowerCase().includes(userInput.toLowerCase()) ||
              m.ref.includes(userInput)
            : undefined
        )
      );
    } else {
      setResult(movies);
    }
  }, [userInput, movies]);

  return (
    <div className="flex flex-col w-full">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Rechercher un film ou une référence"
        className="w-5/6 lg:w-1/4 mx-auto my-8 pl-6 h-12 border border-blue-500 text-blue-600 font-medium rounded-full placeholder-blue-400"
      />

      {result.length > 0 ? (
        <>
          <ul className=" w-11/12 mx-auto grid grid-flow-cols grid-cols-1 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-6">
            {result.map((m) => (
              <List
                key={m.ref + " " + m.title}
                movie={m}
                codeEquivalent={codeEquivalent}
              />
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
