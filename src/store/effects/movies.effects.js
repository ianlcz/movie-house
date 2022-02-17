import { moviesAreLoading, setMovies } from "../actions/movies.actions";

const MOVIES_MOCK = [{ title: "Tenet" }];

export const fetchMovies = () => (dispatch, getState) => {
  const { data } = getState().movies;

  if (data.length === 0) {
    dispatch(moviesAreLoading());
    dispatch(setMovies(MOVIES_MOCK));
  }
};
