import axios from "axios";
import jwt from "jwt-decode";
import { getCookieFromBrowser } from "../../auth/cookies";
import { moviesActions } from "../actions/movies.action";

export const getAllMovies = () => async (dispatch) => {
  const {
    data: {
      owner: {
        movies: { movies },
      },
    },
  } = await axios.get(
    `/api/account/${jwt(getCookieFromBrowser("authToken")).sub}`,
  );

  dispatch({ type: moviesActions.IS_LOADING });
  dispatch({
    type: moviesActions.SET_MOVIES,
    movies,
  });
};
