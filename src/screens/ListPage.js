import TitlePage from "../components/TitlePage";
import SearchBar from "../components/SearchBar";

const ListPage = () => (
  <div className="flex flex-col items-start w-full min-h-screen mx-auto pt-4 bg-blue-50">
    <TitlePage />
    <SearchBar />
  </div>
);

export default ListPage;
