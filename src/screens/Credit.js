import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import axios from "axios";
import Poster from "../components/Poster";
import Body from "../components/Credit/Body";
import Footer from "../components/Movie/Pane/Footer";

const Credit = () => {
  const { id } = useParams();
  const [people, setPeople] = useState({});
  const [bestMovies, setBestMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const peopleData = await axios
        .get(
          `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
        )
        .then((res) => res.data)
        .catch((err) => console.error(err.message));
      const movies = await axios
        .get(
          `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
        )
        .then((res) => res.data)
        .catch((err) => console.error(err.message));

      setPeople(peopleData);
      setBestMovies(
        peopleData.known_for_department === "Acting"
          ? movies.cast
              .sort(
                (a, b) =>
                  b.popularity + b.vote_count - (a.popularity + a.vote_count)
              )
              .slice(0, 4)
          : peopleData.known_for_department === "Directing" ||
            peopleData.known_for_department === "Production"
          ? movies.crew
              .filter((m) => m.job === "Director")
              .sort(
                (a, b) =>
                  b.popularity + b.vote_count - (a.popularity + a.vote_count)
              )
              .slice(0, 4)
          : movies.crew
              .filter((m) => m.job === "Original Music Composer")
              .sort(
                (a, b) =>
                  b.popularity + b.vote_count - (a.popularity + a.vote_count)
              )
              .slice(0, 4)
      );
    };
    fetchData();
  }, [id]);

  console.log(bestMovies);

  const {
    profile_path,
    name,
    birthday,
    deathday,
    place_of_birth,
    biography,
    gender,
  } = people;

  return profile_path ? (
    <>
      <Helmet>
        <title>{`${name} | Movie House`}</title>
      </Helmet>
      <div className="bg-blue-50 min-h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full px-8 pt-8">
          <Poster>{{ poster_path: profile_path, title: name }}</Poster>
          <Body>
            {{
              name,
              birthday,
              deathday,
              place_of_birth,
              biography,
              gender,
              bestMovies,
            }}
          </Body>
        </div>
        <Footer />
      </div>
    </>
  ) : null;
};

export default Credit;
