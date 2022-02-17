import { combineReducers, createStore } from "redux";
import { moviesReducer } from "./reducers/movies.reducers";

const reducers = combineReducers({ movies: moviesReducer });

export const store = createStore(reducers);
