import { useContext } from "react";
import { IoAddCircle, IoExit, IoRemoveCircle } from "react-icons/io5";
import AuthContext from "../auth/AuthContext";

const Actions = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="flex w-2/3 mx-auto my-8 justify-evenly">
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

      <button
        onClick={() => {
          logout();
          window.location.reload(false);
        }}
        className="flex items-center w-max px-2 py-1 text-blue-50 bg-gradient-to-br from-blue-800 to-blue-400 hover:from-blue-400 hover:to-blue-800 rounded-full shadow"
      >
        <IoExit className="w-5 h-5" />
        <span className="ml-2 text-sm">Me déconnecter</span>
      </button>
    </div>
  );
};

export default Actions;
