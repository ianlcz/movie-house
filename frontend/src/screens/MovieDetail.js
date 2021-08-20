import { useParams } from "react-router-dom";

const MovieDetail = () => {
  let { title } = useParams();
  return <p>{title}</p>;
};

export default MovieDetail;
