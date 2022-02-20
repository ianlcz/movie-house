import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { moviesReducer } from "./reducers/movies.reducer";

const reducers = combineReducers({ movies: moviesReducer });

const composeEnhancer = compose;

export const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(ReduxThunk)),
);
