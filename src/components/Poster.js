import { useLocation } from "react-router";

const Poster = ({ children: { poster_path, title } }) => (
  <img
    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
    alt={
      useLocation().pathname.includes("/movie/")
        ? `Affiche du film : ${title}`
        : `Image de : ${title}`
    }
    className="w-52 lg:w-72 object-cover rounded-xl shadow-xl"
  />
);

export default Poster;
