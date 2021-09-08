import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import { Helmet } from "react-helmet";

const DeleteMovie = () => {
  const { user, movies } = useContext(AuthContext);
  const history = useHistory();
  const [suggestion, setSuggestion] = useState([]);
  const [title, setTitle] = useState("");
  const [ref, setRef] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = movies.filter((m) =>
        m.title.toLowerCase().match(title.toLowerCase())
      );

      if (title !== "") {
        setSuggestion(movie);
      } else {
        setSuggestion([]);
      }
    };
    fetchMovie();
  }, [title]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(`/api/collection/${user.movies._id}/${ref}`)
      .then((res) => res.data)
      .catch((err) => console.error(err.message));

    history.push("/");
    window.location.reload(false);
  };

  return (
    <>
      <Helmet>
        <title>{`Suppression d'un film | Movie House`}</title>
      </Helmet>
      <div className="flex flex-col bg-gradient-to-br from-red-900 to-red-400 min-h-screen">
        <div className="w-auto mx-auto my-auto p-8 bg-red-50 rounded-xl shadow-lg">
          <h1 className="mb-6 font-semibold text-2xl text-center text-red-900">
            Retirer un film de ma collection
          </h1>
          <form onSubmit={handleDelete}>
            <input
              type="text"
              name="title"
              placeholder="Quel film souhaitez-vous retirer ?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-1 text-sm text-red-400 border-2 border-red-200 placeholder-red-200 rounded-full font-semibold shadow-inner"
            />

            {suggestion && suggestion.length > 0 ? (
              <ul
                className={`my-8 ${
                  suggestion.length === 1
                    ? ""
                    : "grid grid-flow-col grid-cols-2 grid-rows-2 gap-8"
                }`}
              >
                {suggestion.slice(0, 4).map((m) => (
                  <li
                    onClick={() => {
                      setRef(m.ref);
                      setTitle(`${m.ref} - ${m.title} (${m.year})`);
                    }}
                    className="flex flex-row items-center w-max mx-auto px-2 rounded-full text-white bg-gradient-to-br from-red-800 to-red-400 truncate cursor-pointer"
                  >
                    <p className="text-sm font-bold mr-1">{`${m.ref} -`}</p>
                    <p className="mr-2 text-sm font-semibold">{m.title}</p>
                    <p className="text-sm">{`(${m.year})`}</p>
                  </li>
                ))}
              </ul>
            ) : undefined}

            <div className="flex mx-auto mt-4 justify-evenly">
              <button
                type="submit"
                className="px-4 text-sm py-1 bg-gradient-to-tr from-red-800 to-red-400 hover:from-red-400 hover:to-red-800 font-medium text-red-50 rounded-full"
              >
                Retirer ce film
              </button>

              <a
                href="/"
                className="px-4 text-sm py-1 bg-gradient-to-tr from-blue-800 to-blue-400 hover:from-blue-400 hover:to-blue-800 font-medium text-blue-50 rounded-full"
              >
                Annuler
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteMovie;
