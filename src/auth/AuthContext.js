import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import { getCookieFromBrowser, removeCookie, setCookie } from "./cookies";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const { Provider } = AuthContext;
  let [user, setUser] = useState(null);
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
          }
        } catch (error) {
          if (error.response.status === 401) {
            removeCookie("authToken");
            setUser(null);
          }
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

    console.log(token);

    if (token) {
      setCookie("authToken", token);
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      const authData = jwt(token);
      let {
        data: { owner },
      } = await axios.get(`/api/account/${authData.sub}`);

      setUser(owner);
    }
  };

  const logout = () => {
    removeCookie("authToken");

    setUser(null);
  };

  return (
    <Provider
      value={{ isAuthenticated: !!user, user, login, logout, isLoading }}
    >
      {children}
    </Provider>
  );
};

export default AuthContext;
