import Background from "../Background";
import Footer from "./Footer";
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
    className={`flex flex-col bg-blue-50 -mt-8 px-6 pt-6 shadow-md rounded-t-2xl  ${
      trailers.length > 0 ? undefined : "lg:max-h-screen"
    } z-10 relative`}
  >
    {production_companies ? (
      <>
        <div className="flex flex-col lg:flex-row justify-between items-start w-full text-blue-800">
          <GoToHome />

          <div className="w-full">
            <h2 className="text-xl text-blue-800 text-center font-semibold">
              {production_companies.filter((p) => p.logo_path).length > 1
                ? "Sociétés"
                : "Société"}{" "}
              de production
            </h2>
            <ul className="flex flex-row justify-around lg:justify-evenly my-6">
              {production_companies.filter((p) => p.logo_path).length === 0
                ? production_companies.slice(0, 2).map((p) => (
                    <li key={p.id}>
                      <p className="w-max mx-auto text-blue-800 text-center text-xs font-medium">
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
                        <p className="w-max mx-auto mt-2 text-blue-800 text-center text-xs font-medium">
                          {p.name}
                        </p>
                      </li>
                    ))}
            </ul>

            <h2 className="text-xl mb-4 text-center font-semibold">
              Distribution
            </h2>
            <ul
              className={`grid grid-flow-col grid-rows-${
                cast.filter((p) => p.profile_path).slice(0, 6).length
              } lg:grid-rows-2 gap-x-14 gap-y-8`}
            >
              {cast
                .filter((p) => p.profile_path)
                .slice(0, 6)
                .map((c) => (
                  <li key={c.id}>
                    <a
                      href={`/credit/${c.id}`}
                      className="flex flex-row items-center w-4/5 mx-auto"
                    >
                      {c.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
                          alt={`Profil de : ${c.name}`}
                          className="w-16 h-16 lg:w-20 lg:h-auto object-cover rounded-lg shadow-md"
                        />
                      ) : undefined}
                      <div className="lg:ml-2 px-4 py-2">
                        <p className="w-max mx-auto px-2 shadow-inner font-bold text-white text-xs lg:text-sm bg-gradient-to-br from-blue-800 to-blue-400 rounded-full">
                          {c.name}
                        </p>
                        <p className="mt-1 text-center text-xs lg:text-sm">
                          {c.character}
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
              <div className="w-4/6 lg:w-1/3 mx-auto mt-10">
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
