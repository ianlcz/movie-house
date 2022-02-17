import { moviesActions } from "../actions/movies.actions";

const initialState = {
  data: [],
  isLoading: false,
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case moviesActions.SET_MOVIES:
      return { ...state, data: action.movies, isLoading: false };

    case moviesActions.ADD_NEW_MOVIE:
      return { ...state, data: state.data.concat(action.movies) };

    case moviesActions.MOVIES_ARE_LOADING:
      return { ...state, isLoading: true };

    default:
      return state
  }
};
