import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import { isMobileOnly } from "react-device-detect";
import axios from "axios";
import Poster from "../components/Poster";
import Body from "../components/Credit/Body";
import GoToHome from "../components/Movie/Pane/GoToHome";
import Footer from "../components/Footer";

const Credit = () => {
  const { title } = useParams();
  const [people, setPeople] = useState({});
  const [bestMovies, setBestMovies] = useState([]);
  const [filmography, setFilmography] = useState({});
  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      const peopleData = await axios
        .get(
          `https://api.themoviedb.org/3/person/${title}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
        )
        .then((res) => res.data)
        .catch((err) => console.error(err.message));
      const movies = await axios
        .get(
          `https://api.themoviedb.org/3/person/${title}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
        )
        .then((res) => res.data)
        .catch((err) => console.error(err.message));

      setPeople(peopleData);
      setBestMovies(
        peopleData.known_for_department === "Acting"
          ? movies.cast
              .sort(
                (a, b) =>
                  b.popularity + b.vote_count - (a.popularity + a.vote_count),
              )
              .filter((m) =>
                m.character ? !m.character.includes("(uncredited)") : undefined,
              )
              .slice(0, 4)
          : peopleData.known_for_department === "Directing" ||
            peopleData.known_for_department === "Production"
          ? movies.crew
              .filter((m) => m.job === "Director")
              .sort(
                (a, b) =>
                  b.popularity + b.vote_count - (a.popularity + a.vote_count),
              )
              .slice(0, 4)
          : movies.crew
              .filter((m) => m.job === "Original Music Composer")
              .sort(
                (a, b) =>
                  b.popularity + b.vote_count - (a.popularity + a.vote_count),
              )
              .slice(0, 4),
      );
      setFilmography(movies);
    };
    fetchData();
  }, [title]);

  const {
    profile_path,
    name,
    birthday,
    deathday,
    place_of_birth,
    biography,
    known_for_department,
    gender,
  } = people;

  return profile_path ? (
    <>
      <Helmet>
        <title>{`${name} | Movie House`}</title>
      </Helmet>
      <div className="bg-blue-50 min-h-screen">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full px-8 pt-8 lg:pt-0">
          <div className="lg:flex lg:items-center lg:h-full lg:fixed">
            <div>
              <Poster isCenter>
                {{ poster_path: profile_path, title: name }}
              </Poster>

              <div className="flex flex-col w-full">
                <h1 className="w-max mx-auto mt-6 px-4 text-center text-2xl font-semibold text-white bg-gradient-to-br from-blue-700 to-blue-400 rounded-full shadow-inner">
                  {name}
                </h1>

                <p className="w-max mx-auto mt-2 text-base text-blue-500">
                  {deathday
                    ? `(${new Date(birthday).getFullYear()} - ${new Date(
                        deathday,
                      ).getFullYear()})`
                    : `(${
                        today.getMonth() < new Date(birthday).getMonth() ||
                        (today.getMonth() === new Date(birthday).getMonth() &&
                          today.getDate() < new Date(birthday).getDate())
                          ? today.getFullYear() -
                            new Date(birthday).getFullYear() -
                            1
                          : today.getFullYear() -
                            new Date(birthday).getFullYear()
                      } ans)`}
                </p>

                {place_of_birth ? (
                  <p className="w-full truncate mx-auto mt-2 text-sm text-center font-semibold text-blue-600">
                    {place_of_birth
                      .replace(/s*\[.*?]s*/g, "")
                      .replace(" ,", ",")}
                  </p>
                ) : undefined}
              </div>
              {!isMobileOnly ? (
                <div className="mt-6">
                  <GoToHome isCenter isOnCreditPane />
                </div>
              ) : undefined}
            </div>
          </div>

          <Body>
            {{
              name,
              birthday,
              deathday,
              place_of_birth,
              biography,
              gender,
              known_for_department,
              bestMovies: bestMovies
                ? bestMovies.filter((m) => m.poster_path)
                : undefined,
              filmography,
            }}
          </Body>
        </div>
        <Footer />
      </div>
    </>
  ) : null;
};

export default Credit;
