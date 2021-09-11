import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import Submit from "../components/Submit";
import { Helmet } from "react-helmet";

const DeleteMovie = () => {
  const { user, movies } = useContext(AuthContext);
  const history = useHistory();
  const { reference } = useParams();
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    setSuggestion(
      movies.filter((m) => (m.ref ? m.ref === reference : undefined))
    );
  }, [movies, reference]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(`/api/collection/${user.movies._id}/${reference}`)
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
            Souhaitez-vous retirer ce film ?
          </h1>
          <form onSubmit={handleDelete}>
            {suggestion && suggestion.length > 0 ? (
              <ul
                className={`my-8 ${
                  suggestion.length === 1
                    ? ""
                    : "grid grid-flow-col grid-cols-2 grid-rows-2 gap-8"
                }`}
              >
                {suggestion.map((m) => (
                  <li className="flex flex-row items-center w-max mx-auto px-2 rounded-full text-white bg-gradient-to-br from-red-800 to-red-400 truncate">
                    <p className="text-sm font-bold mr-1">{`${m.ref} -`}</p>
                    <p className="mr-2 text-sm font-semibold">{m.title}</p>
                    <p className="text-sm">{`(${m.year})`}</p>
                  </li>
                ))}
              </ul>
            ) : undefined}

            <Submit buttonTitle="Oui" />
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteMovie;
