import { useContext } from "react";
import { useLocation } from "react-router";
import { IoAddCircle, IoExit, IoPencil, IoRemoveCircle } from "react-icons/io5";

import AuthContext from "../auth/AuthContext";

const Actions = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  return (
    <>
      {!children ? (
        <div className="flex justify-evenly w-2/3 mx-auto mt-6">
          <a
            href="/new"
            className="flex items-center w-max px-2 py-1 text-green-600 hover:text-green-50 border border-green-500 hover:border-green-400 bg-green-50 hover:bg-green-400 rounded-full shadow"
          >
            <IoAddCircle className="w-5 h-5" />
            <span className="ml-2 text-sm">Ajouter un nouveau film</span>
          </a>

          <button
            onClick={() => {
              logout();
              window.location.reload(false);
            }}
            className="flex items-center w-max px-2 py-1 text-blue-50 bg-gradient-to-br from-blue-800 to-blue-400 border-2 border-blue-50 hover:border-blue-300 rounded-full shadow-inner"
          >
            <IoExit className="w-5 h-5" />
            <span className="ml-2 text-sm">Me déconnecter</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-row mt-2">
          <a
            href={`/edit/${children.ref}/${encodeURIComponent(children.title)}`}
            className="flex items-center w-max mr-5 px-2 py-1 text-yellow-600 hover:text-yellow-50 border border-yellow-500 hover:border-yellow-400 bg-yellow-50 hover:bg-yellow-400 rounded-full shadow"
          >
            <IoPencil className="w-4 h-4" />
            <span className="ml-2 text-xs">Modifier</span>
          </a>

          <a
            href={`/delete/${children.ref}/${encodeURIComponent(
              children.title
            )}`}
            className="flex items-center w-max px-2 py-1 text-red-600 hover:text-red-50 border border-red-500 hover:border-red-400 bg-red-50 hover:bg-red-400 rounded-full shadow"
          >
            <IoRemoveCircle className="w-4 h-4" />
            <span className="ml-2 text-xs">Retirer</span>
          </a>
        </div>
      )}
    </>
  );
};

export default Actions;
