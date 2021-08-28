import { useContext } from "react";
import TitlePage from "../components/TitlePage";
import SearchBar from "../components/SearchBar";
import AuthContext from "../auth/AuthContext";

const ListPage = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="bg-blue-50 min-h-screen">
      <button onClick={() => logout()}>Se déconnecter</button>
      <TitlePage />
      <SearchBar />
    </div>
  );
};

export default ListPage;
