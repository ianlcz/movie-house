import { useContext } from "react";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import TitlePage from "../components/TitlePage";
import SearchBar from "../components/SearchBar";
import AuthContext from "../auth/AuthContext";

const ListPage = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="bg-blue-50 min-h-screen">
      <button
        onClick={() => {
          logout();
          window.location.reload(false);
        }}
      >
        Se déconnecter
      </button>
      <TitlePage />
      <div className="flex w-1/2 mx-auto mt-6 justify-around">
        <a
          href="/new"
          className="flex items-center w-max px-2 py-1 text-green-600 hover:text-green-50 border border-green-500 hover:border-green-400 bg-green-50 hover:bg-green-400 rounded-full shadow"
        >
          <IoAddCircle className="w-5 h-5" />
          <span className="ml-2 text-sm">Ajouter un nouveau film</span>
        </a>

        <a
          href="/delete"
          className="flex items-center w-max px-2 py-1 text-red-600 hover:text-red-50 border border-red-500 hover:border-red-400 bg-red-50 hover:bg-red-400 rounded-full shadow"
        >
          <IoRemoveCircle className="w-5 h-5" />
          <span className="ml-2 text-sm">Retirer un film de ma collection</span>
        </a>
      </div>

      <SearchBar />
    </div>
  );
};

export default ListPage;
