import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import HeadBand from "../components/HeadBand/HeadBand";
import Pane from "../components/Pane/Pane";
import { getCookieFromBrowser } from "../auth/cookies";
import jwtDecode from "jwt-decode";
import LoadingPage from "./LoadingPage";

const MovieDetail = () => {
  const { getMovieInfo, isLoading, movies } = useContext(AuthContext);
  const { title } = useParams();
  const [detail, setDetail] = useState({});
  const [directors, setDirectors] = useState([]);
  const [compositors, setCompositors] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailers, setTrailers] = useState([]);

  const token = getCookieFromBrowser("authToken");
  const user = jwtDecode(token);
  const year = new URLSearchParams(useLocation().search).get("year");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieFinded = movies.filter(
          (m) =>
            m.title.toLowerCase() === decodeURIComponent(title.toLowerCase()) &&
            m.year == year
        )[0];

        if (movieFinded) {
          const { movie, directors, compositors, cast, trailers } =
            await getMovieInfo(movieFinded);

          setDetail(movie);
          setDirectors(directors);
          setCompositors(compositors);
          setCast(cast);
          setTrailers(trailers);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [movies]);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      {detail.title ? (
        <Helmet>
          <title>{`${detail.ref} - ${detail.title} | Movie House`}</title>
        </Helmet>
      ) : undefined}
      <HeadBand>{{ detail, directors, compositors }}</HeadBand>
      <Pane>{{ detail, cast, trailers }}</Pane>
    </>
  );
};

export default MovieDetail;
