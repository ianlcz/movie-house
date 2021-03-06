import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { getCookieFromBrowser, removeCookie, setCookie } from "./cookies";

const AuthContext = createContext({
  user: null,
  movies: [],
  getMovieInfo: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const { Provider } = AuthContext;
  let [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const initUser = async (token) => {
    try {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const authData = jwt(token);
      const {
        data: { owner },
      } = await axios.get(`/api/account/${authData.sub}`);

      if (owner) {
        setUser(owner);
        const moviesUser = owner.movies.movies;

        setMovies(moviesUser);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const loadUserFromCookies = async () => {
      const token = getCookieFromBrowser("authToken");
      if (token) {
        initUser(token);
      }
    };
    loadUserFromCookies();
  }, []);

  const login = async (emailAddress, password) => {
    const {
      data: { token },
    } = await axios.post("/api/account/login", {
      emailAddress,
      password,
    });

    if (token) {
      setCookie("authToken", token);
      initUser(token);
    }
  };

  const logout = () => {
    removeCookie("authToken");

    setUser(null);
    setMovies([]);
  };

  /**
   * @param {Object} movie
   * @returns informations of movie
   */
  const getMovieInfo = async ({ ref, title, year }) => {
    if (title) {
      const results = await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            title,
          )}&api_key=${
            process.env.REACT_APP_API_KEY
          }&language=fr-FR&primary_release_year=${year}`,
        )
        .then((res) => res.data.results)
        .catch((err) => console.error(err.message));

      if (results.length > 1) {
        results.sort((a, b) => b.popularity - a.popularity);
      }

      const moviesTMDB =
        year && results.length > 1
          ? results.filter((m) =>
              m.title
                ? m.title.trim().toLowerCase() === title.trim().toLowerCase()
                : undefined,
            )
          : results;

      if (moviesTMDB[0]) {
        const movieID = moviesTMDB[0].id;

        const movie = await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
          )
          .then((res) => res.data)
          .catch((err) => console.error(err.message));

        const crew = await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
          )
          .then((res) => res.data.crew)
          .catch((err) => console.error(err.message));

        const cast = await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
          )
          .then((res) => res.data.cast)
          .catch((err) => console.error(err.message));

        const trailers = await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
          )
          .then((res) => res.data.results)
          .catch((err) => console.error(err.message));

        movie.release_date = await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieID}/release_dates?api_key=${process.env.REACT_APP_API_KEY}`,
          )
          .then(
            (res) =>
              res.data.results.find((r) => r.iso_3166_1 === "FR")
                .release_dates[0].release_date,
          )
          .catch((err) => console.error(err.message));

        movie.ref = ref;

        return {
          movie,
          directors: crew.filter((c) => c.job === "Director"),
          compositors: crew.filter(
            (c) => c.job === "Original Music Composer" || c.job === "Music",
          ),
          cast,
          trailers:
            trailers.filter(
              (t) =>
                t.name.toLowerCase().includes("vf") &&
                t.site === "YouTube" &&
                t.type === "Trailer" &&
                t.official === true,
            ).length === 0
              ? trailers.filter(
                  (t) =>
                    t.name.toLowerCase().includes("vf") &&
                    t.site === "YouTube" &&
                    t.type === "Teaser" &&
                    t.official === true,
                )
              : trailers.filter(
                  (t) =>
                    t.name.toLowerCase().includes("vf") &&
                    t.site === "YouTube" &&
                    t.type === "Trailer" &&
                    t.official === true,
                ),
        };
      }
    }
  };

  return (
    <Provider
      value={{
        isAuthenticated: !!user,
        user,
        movies,
        login,
        logout,
        getMovieInfo,
        isLoading,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthContext;
