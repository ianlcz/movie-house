import React, { useEffect, useState } from "react";
import axios from "axios";
import TitlePage from "./components/TitlePage";

const App = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      setMovies(
        await axios.get("http://localhost:8080").then((res) => res.data)
      );
    };
    fetchMovies();
  }, []);

  return (
    <div className="App">
      <TitlePage />
    </div>
  );
};

export default App;
