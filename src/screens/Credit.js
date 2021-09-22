import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Poster from "../components/Poster";
import Body from "../components/Credit/Body";

const Credit = () => {
  const { id } = useParams();
  const [people, setPeople] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setPeople(
        await axios
          .get(
            `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
          )
          .then((res) => res.data)
          .catch((err) => console.error(err.message))
      );
    };
    fetchData();
  }, [id]);

  const { profile_path, name, birthday, deathday, place_of_birth, biography } =
    people;
  
  console.log(people)

  return profile_path ? (
    <div className="bg-blue-50 min-h-screen">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-8 pt-8">
        <Poster>{{ poster_path: profile_path, title: name }}</Poster>
        <Body>{{ name, birthday, deathday, place_of_birth, biography }}</Body>
      </div>
    </div>
  ) : null;
};

export default Credit;
