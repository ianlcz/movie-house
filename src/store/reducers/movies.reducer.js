import { moviesActions } from "../actions/movies.action";

const initialState = {
  isLoading: false,
  data: [],
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case moviesActions.SET_MOVIES:
      return { ...state, data: action.movies, isLoading: false };

    case moviesActions.ADD_NEW_MOVIE:
      return { ...state, data: state.data.concat(action.movies) };

    case moviesActions.IS_LOADING:
      return { ...state, isLoading: true };

    default:
      return state;
  }
};
