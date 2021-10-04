import SearchBar from "../components/SearchBar";
import Actions from "../components/Actions";
import Footer from "../components/Footer";
import TitlePage from "../components/TitlePage";

const Home = () => (
  <div className="flex flex-col w-full mx-auto bg-blue-50 min-h-screen">
    <SearchBar />

    <div className="w-full mb-6 bottom-0 fixed">
      <div className="flex flex-col w-11/12 lg:w-1/2 mx-auto py-6 bg-blue-800 bg-opacity-60 shadow-md backdrop-filter backdrop-blur-xl rounded-2xl">
        <TitlePage />
        <Actions />
      </div>
    </div>
  </div>
);

export default Home;
