import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import { useHistory } from "react-router-dom";
import Card from "../components/Movie/Card";

const NewMovie = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [ref, setRef] = useState("");
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [genre, setGenre] = useState([]);
  const [year, setYear] = useState(0);

  const API_KEY = "aeeca3eb934c595a32cbd53a16f76f64";

  useEffect(() => {
    const fetchMovie = async () => {
      if (title !== "") {
        const data = await axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${title.trim()}&api_key=${API_KEY}&language=fr-FR`
          )
          .then((res) => res.data.results)
          .catch((err) => console.error(err.message));

        setSuggestion(data);
      } else {
        setSuggestion([]);
      }
    };
    fetchMovie();
  }, [title]);

  const handleMovie = async (e) => {
    e.preventDefault();

    if (user) {
      await axios
        .post(`/api/collection/${user.movies._id}`, {
          ref,
          title,
          genre,
          year,
        })
        .then((res) => res.data)
        .catch((err) => console.error(err.message));

      history.push("/");
      window.location.reload(false);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-900 to-blue-400 min-h-screen">
      <div className="w-2/3 mx-auto my-auto p-8 bg-blue-50 rounded-xl shadow-lg">
        <h1 className="mb-6 font-semibold text-2xl text-center text-blue-900">
          Votre nouveau film
        </h1>
        <form onSubmit={handleMovie}>
          <div className="flex flex-row justify-between">
            <input
              type="text"
              name="ref"
              placeholder="Entrez une référence"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              required
              className="w-max mx-auto px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
            />
            <input
              type="text"
              name="title"
              placeholder="Recherchez votre film"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-max mx-auto px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
            />
          </div>

          {suggestion && suggestion.length > 0 ? (
            <ul
              className={`my-8 w-max m-auto ${
                suggestion.length === 1
                  ? ""
                  : "grid grid-flow-col grid-cols-2 grid-rows-2 gap-8"
              }`}
            >
              {suggestion
                .filter((m) => m.poster_path)
                .slice(0, 4)
                .map((m) => (
                  <Card
                    key={m.id}
                    onClick={() => {
                      setTitle(m.title);
                      setGenre(m.genre_ids);
                      setYear(new Date(m.release_date).getFullYear());
                    }}
                  >
                    {m}
                  </Card>
                ))}
            </ul>
          ) : undefined}

          <div className="w-max mx-auto">
            <button
              type="submit"
              className="mt-4 px-4 text-sm py-1 bg-gradient-to-tr from-blue-800 to-blue-400 hover:from-blue-400 hover:to-blue-800 font-medium text-blue-50 rounded-full"
            >
              Ajouter ce film
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMovie;
