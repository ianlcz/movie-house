import { useContext } from "react";
import AuthContext from "../auth/AuthContext";

const TitlePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="w-full pt-4">
      <h1
        className={`w-max mx-auto mb-1 ${
          isAuthenticated ? "text-blue-800 text-2xl" : "text-white text-3xl"
        } font-bold`}
      >
        Movie House
      </h1>
      <p
        className={`w-max mx-auto ${
          isAuthenticated ? "text-blue-600" : "text-white"
        }`}
      >
        by ianlcz
      </p>
    </div>
  );
};

export default TitlePage;
