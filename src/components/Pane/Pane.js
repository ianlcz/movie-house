import Background from "../Background";
import GoToHome from "../GoToHome";

const Pane = ({
  children: {
    detail: { production_companies, belongs_to_collection },
    cast,
  },
}) => (
  <div className="flex flex-row bg-blue-50 -mt-10 px-6 py-6 shadow-md rounded-2xl max-h-screen z-10 relative">
    <div className="w-4/5">
      {production_companies ? (
        <div className="text-blue-800">
          <h2 className="text-xl mb-4 text-center font-semibold">
            Distribution
          </h2>
          <ul className="w-max mx-auto grid grid-flow-col grid-rows-2 gap-x-14 gap-y-8">
            {cast.slice(0, 6).map((c) => (
              <li key={c.id} className="flex flex-row items-center">
                {c.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
                    alt={`Profil de : ${c.name}`}
                    className="w-20 rounded-lg shadow-md"
                  />
                ) : undefined}
                <div className="ml-2 px-4 py-2">
                  <p className="w-max mx-auto px-2 shadow-inner font-bold text-white text-sm bg-gradient-to-br from-blue-800 to-blue-400 rounded-full">
                    {c.name}
                  </p>
                  <p className="mt-1 text-center text-sm">{c.character}</p>
                </div>
              </li>
            ))}
          </ul>
          <GoToHome />
        </div>
      ) : undefined}
    </div>

    {production_companies ? (
      <div className="my-auto w-1/5">
        <h2 className="text-xl text-blue-800 mb-4 text-center font-semibold">
          Produit par
        </h2>
        <ul className="flex flex-row justify-evenly">
          {production_companies.slice(0, 2).map((p) => (
            <li key={p.id} className="mb-6">
              {p.logo_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
                  alt={`Logo de ${p.name}`}
                  className="h-8 mx-auto"
                />
              ) : undefined}
              <p className="w-max mx-auto mt-2 px-2 py-0.5 text-white text-center text-xs font-medium bg-gradient-to-br from-blue-800 to-blue-400 rounded-full">
                {p.name}
              </p>
            </li>
          ))}
        </ul>

        {belongs_to_collection ? (
          <div className="w-full">
            <Background
              data={{
                cover: `https://image.tmdb.org/t/p/original/${belongs_to_collection.backdrop_path}`,
                title: belongs_to_collection.name,
              }}
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
    ) : undefined}
  </div>
);

export default Pane;
