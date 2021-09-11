import TitlePage from "../components/TitlePage";
import SearchBar from "../components/SearchBar";
import Actions from "../components/Actions";

const ListPage = () => (
  <div className="flex flex-col items-start w-full min-h-screen mx-auto pt-4 bg-blue-50">
    <TitlePage />
    <Actions />
    <SearchBar />
  </div>
);

export default ListPage;
