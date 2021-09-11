import axios from "axios";
import { useEffect, useState } from "react";
import Actions from "../Actions";

const List = ({ movie }) =>
  movie.title ? (
    <li>
      <a
        href={`/movie/${encodeURIComponent(movie.title)}?year=${movie.year}`}
        className="flex flex-row items-center mb-2"
      >
        <p className="flex items-center justify-center w-16 h-6 mr-4 shadow-inner bg-gradient-to-br from-blue-800 to-blue-500 text-white text-center text-sm font-semibold rounded-xl">
          {movie.ref}
        </p>
        <div>
          <p className="text-blue-700 font-light">
            {movie.title}
            {movie.year ? (
              <span className="ml-1 font-medium text-sm">{`(${movie.year})`}</span>
            ) : undefined}
          </p>
          <p className="text-blue-700 text-xs">{`Code : ${movie.code}`}</p>
          <Actions>{{ title: movie.title, ref: movie.ref }}</Actions>
        </div>
      </a>
    </li>
  ) : undefined;

export default List;