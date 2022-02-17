export const moviesActions = {
  SET_MOVIES: "SET_MOVIES",
  ADD_NEW_MOVIE: "ADD_NEW_MOVIES",
  MOVIES_ARE_LOADING: "MOVIES_ARE_LOADING",
};

export const setMovies = (movies) => ({
  type: moviesActions.SET_MOVIES,
  movies,
});

export const addNewMovie = (movie) => ({
  type: moviesActions.ADD_NEW_MOVIE,
  movie,
});

export const moviesAreLoading = () => ({
  type: moviesActions.MOVIES_ARE_LOADING,
});
