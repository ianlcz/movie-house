import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import { getCookieFromBrowser, removeCookie, setCookie } from "./cookies";

const AuthContext = createContext({
  user: null,
  movies: [],
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const { Provider } = AuthContext;
  let [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserFromCookies = async () => {
      const token = getCookieFromBrowser("authToken");
      if (token) {
        try {
          axios.defaults.headers.Authorization = `Bearer ${token}`;
          const authData = jwt(token);
          let {
            data: { owner },
          } = await axios.get(`/api/account/${authData.sub}`);

          if (owner) {
            setUser(owner);
            setMovies(owner.movies.movies);
          }
        } catch (err) {
          console.error(err.message);
        }
      }
      setIsLoading(false);
    };
    loadUserFromCookies();
  }, []);

  const login = async (emailAddress, password) => {
    const {
      data: { token },
    } = await axios.post("/api/login", {
      emailAddress,
      password,
    });

    if (token) {
      setCookie("authToken", token);
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      const authData = jwt(token);
      let {
        data: { owner },
      } = await axios.get(`/api/account/${authData.sub}`);

      setUser(owner);
      setMovies(owner.movies.movies);
    }
  };

  const logout = () => {
    removeCookie("authToken");

    setUser(null);
    setMovies([]);
  };

  return (
    <Provider
      value={{
        isAuthenticated: !!user,
        user,
        movies,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthContext;
