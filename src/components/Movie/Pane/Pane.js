import { isMobileOnly } from "react-device-detect";
import Footer from "../../Footer";
import Background from "../Background";
import GoToHome from "./GoToHome";
import Trailer from "./Trailer";

const Pane = ({
  children: {
    detail: { ref, production_companies, belongs_to_collection },
    cast,
    trailers,
  },
}) => (
  <div
    className={`flex flex-col bg-blue-50 -mt-8 px-6 pt-6 rounded-t-2xl ${
      trailers.length > 0
        ? undefined
        : belongs_to_collection
        ? "lg:min-h-screen"
        : "lg:max-h-screen"
    } z-10 relative`}
  >
    {production_companies ? (
      <>
        <div className="flex flex-col lg:flex-row justify-between items-start w-full text-blue-600">
          <GoToHome />

          <div className="w-full">
            <h2 className="text-xl text-blue-600 text-center font-medium">
              {production_companies.filter((p) => p.logo_path).length > 1
                ? "Sociétés"
                : "Société"}{" "}
              de production
            </h2>
            <ul className="flex flex-row justify-around lg:justify-evenly my-6">
              {production_companies.filter((p) => p.logo_path).length === 0
                ? production_companies.slice(0, 2).map((p) => (
                    <li key={p.id}>
                      <p className="w-max mx-auto text-blue-600 text-center text-xs font-medium">
                        {p.name}
                      </p>
                    </li>
                  ))
                : production_companies
                    .filter((p) => p.logo_path)
                    .slice(0, 2)
                    .map((p) => (
                      <li key={p.id}>
                        {p.logo_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
                            alt={`Logo de ${p.name}`}
                            className="h-8 mx-auto"
                          />
                        ) : undefined}
                        <p className="w-max mx-auto mt-2 text-blue-600 text-center text-xs font-medium">
                          {p.name}
                        </p>
                      </li>
                    ))}
            </ul>

            <h2 className="text-xl mb-4 text-center font-medium">
              Distribution
            </h2>
            <ul
              className={`grid grid-flow-col grid-cols-2 grid-rows-3 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-6`}
            >
              {cast
                .filter((p) => p.profile_path)
                .slice(0, isMobileOnly ? 6 : 9)
                .map((c) => (
                  <li
                    key={c.id}
                    className="w-fit lg:w-max pr-2 lg:pr-0 hover:bg-blue-100 rounded-xl transition duration-500 ease-in"
                  >
                    <a
                      href={`/credit/${c.id}`}
                      className="flex flex-row items-center"
                      title="Voir le profil"
                    >
                      {c.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
                          alt={`Profil de ${c.name}`}
                          className="w-16 h-16 md:w-20 md:h-auto object-cover rounded-xl shadow-md"
                        />
                      ) : undefined}
                      <div className="lg:ml-2 px-2 lg:px-4 py-2">
                        <p className="w-max mx-auto px-2 shadow-inner text-white text-xs lg:text-sm bg-gradient-to-br from-blue-600 to-blue-400 rounded-full">
                          <span className="font-light">{`${
                            c.name.split(" ")[0]
                          } `}</span>
                          <span className="font-medium">
                            {c.name.split(" ").slice(1).join(" ")}
                          </span>
                        </p>
                        <p className="mt-1 text-center text-xs lg:text-sm">
                          {c.character.split(" / ").slice(0, 6).join(" / ")}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
            </ul>

            {trailers.length > 0 ? (
              <>
                <h2 className="text-xl mt-6 mb-4 text-center font-semibold">
                  Bande-annonce
                </h2>
                <Trailer>{trailers}</Trailer>
              </>
            ) : undefined}

            {belongs_to_collection && belongs_to_collection.backdrop_path ? (
              <div className="w-full lg:w-1/3 mx-auto mt-10">
                <Background
                  data={{
                    cover: `https://image.tmdb.org/t/p/original/${belongs_to_collection.backdrop_path}`,
                    title: belongs_to_collection.name,
                  }}
                  isOnPane
                >
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg text-center text-blue-200">
                      Collection
                    </h3>
                    <p className="ml-2 font-medium text-center text-blue-200">
                      {belongs_to_collection.name.split(" - ")[0]}
                    </p>
                  </div>
                </Background>
              </div>
            ) : undefined}
          </div>
        </div>

        <Footer />
      </>
    ) : undefined}
  </div>
);

export default Pane;
