import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import { useHistory } from "react-router-dom";

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
      }
    };
    fetchMovie();
  }, [title]);

  const handleMovie = async (e) => {
    e.preventDefault();

    if (user) {
      await axios
        .put(`/api/collection/${user.movies._id}`, {
          ref,
          title,
          genre,
          year,
        })
        .then((res) => res.data)
        .catch((err) => console.error(err.message));

      history.push("/");
    }
  };

  console.log(title, genre, year, user && user.movies._id);

  return (
    <>
      <h1>Ajouter un nouveau film</h1>
      <form onSubmit={handleMovie}>
        <input
          type="text"
          name="ref"
          placeholder="Entrez une référence"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          required
          className="w-max border"
        />
        <input
          type="text"
          name="title"
          placeholder="Recherchez votre film"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-max border"
        />

        {suggestion && suggestion.length > 0 ? (
          <ul>
            {suggestion.map((m) => (
              <li
                key={m.id}
                onClick={() => {
                  setTitle(m.title);
                  setGenre(m.genre_ids);
                  setYear(new Date(m.release_date).getFullYear());
                }}
              >
                <p>{m.title}</p>
              </li>
            ))}
          </ul>
        ) : undefined}

        <div>
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </>
  );
};

export default NewMovie;
