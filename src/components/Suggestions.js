import { useContext } from "react";
import { IoInformationCircle, IoSyncCircle } from "react-icons/io5";
import AuthContext from "../auth/AuthContext";
import List from "./Movie/List";

const Suggestions = ({ result }) => {
  const { isLoading } = useContext(AuthContext);

  return (
    <div className="mt-84 lg:mt-72">
      {result.length > 0 ? (
        <>
          <ul className=" w-11/12 mx-auto grid grid-flow-cols grid-cols-1 lg:grid-cols-3 lg:gap-x-12 gap-y-3 lg:gap-y-6">
            {result.map((m) => (
              <List key={m.ref + " " + m.title} movie={m} />
            ))}
          </ul>
        </>
      ) : isLoading ? (
        <div className="flex items-center w-max mx-auto mt-60">
          <IoSyncCircle className="animate-spin w-6 mr-2 h-6 text-green-800" />
          <p className="text-green-800 text-sm font-semibold">
            Récupération de vos films...
          </p>
        </div>
      ) : (
        <div className="flex items-center w-max mx-auto mt-60">
          <IoInformationCircle className="w-6 mr-2 h-6 text-green-800" />
          <p className="text-green-800 text-sm font-semibold">
            {`Nous n'avons pas trouvé de films !`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
