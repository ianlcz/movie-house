import { IoSyncCircle } from "react-icons/io5";

const LoadingPage = () => (
  <div className="flex flex-col bg-gradient-to-br from-blue-900 to-blue-400 min-h-screen">
    <div className="flex flex-row items-center lg:w-1/3 mx-auto my-auto px-4 py-6 text-blue-900 bg-blue-50 rounded-full shadow-lg">
      <IoSyncCircle className="animate-spin w-10 h-10 mr-2" />
      <h1 className="font-semibold lg:text-2xl text-center">
        Chargement des données du film...
      </h1>
    </div>
  </div>
);

export default LoadingPage;
