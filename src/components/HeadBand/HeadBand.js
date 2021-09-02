import { IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5";
import { formatNumber } from "../../utils";
import Background from "./Background";
import ReadingTime from "./ReadingTime";

const HeadBand = ({
  children: {
    detail: {
      ref,
      backdrop_path,
      title,
      overview,
      tagline,
      production_companies,
      genres,
      runtime,
      poster_path,
      vote_average,
      budget,
      revenue,
      release_date,
    },
    directors,
    compositors,
  },
}) =>
  directors.length !== 0 ? (
    <Background
      data={{
        cover: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
        title: title,
      }}
    >
      <div className="flex flex-row mt-4 mb-14 items-center justify-evenly">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt={`Affiche du film : ${title}`}
          className="w-72 rounded-xl shadow-xl"
        />

        <div className="flex flex-col w-3/5">
          <p className="w-16 mx-auto mb-2 px-2 py-0.5 text-xs text-center font-semibold rounded-full shadow-inner bg-gradient-to-br from-blue-800 to-blue-500">
            {ref}
          </p>
          <div className="flex flex-row w-max mx-auto mb-2 items-center">
            <h1 className="text-4xl font-semibold truncate">{title}</h1>
            <span className="ml-2 text-2xl font-light truncate">
              ({new Date(release_date).getFullYear()})
            </span>
          </div>

          <div className="flex flex-row w-max mx-auto">
            {genres && (
              <>
                <ul className="flex flex-row">
                  {genres.map((g, index) => (
                    <li
                      key={g.name}
                      className={`ml-1 ${
                        index === genres.length - 1 ? "truncate" : undefined
                      }`}
                    >
                      <p>
                        {g.name}
                        {index === genres.length - 1 ? undefined : ", "}
                      </p>
                    </li>
                  ))}
                </ul>

                <>
                  <p className="mx-2">&bull;</p>
                  <ReadingTime>{runtime}</ReadingTime>
                </>
              </>
            )}
          </div>

          <div className="mt-4 mb-6">
            <p className="font-medium text-blue-100 text-center mb-2">
              Un film de
            </p>
            <ul className="flex flex-row justify-evenly w-3/5 mx-auto">
              {directors.map((d) => (
                <li key={d.id} className="flex flex-row items-center">
                  {d.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${d.profile_path}`}
                      alt={`Profil de : ${d.name}`}
                      className="mr-2 rounded-full w-8 h-8 object-cover shadow"
                    />
                  ) : undefined}
                  <p className="text-sm">{d.name}</p>
                </li>
              ))}
            </ul>
          </div>

          {tagline ? (
            <p className="mb-2 text-blue-100 font-medium text-sm italic">
              {tagline}
            </p>
          ) : undefined}

          {overview ? (
            <>
              <h2 className="text-xl undefined mb-2 font-medium">Synopsis</h2>
              <p className="leading-snug font-light text-base text-justify">
                {overview}
              </p>
            </>
          ) : undefined}

          {compositors.length > 0 ? (
            <div className="mt-6">
              <p className="font-medium text-blue-100 text-center mb-2">
                Bande originale de
              </p>
              <ul className="flex flex-row justify-evenly w-3/5 mx-auto">
                {compositors.map((c) => (
                  <li key={c.id} className="flex flex-row items-center">
                    {c.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
                        alt={`Profil de : ${c.name}`}
                        className="mr-2 rounded-full w-8 h-8 object-cover shadow"
                      />
                    ) : undefined}
                    <p className="text-sm">{c.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : undefined}

          <table className="w-1/2 mx-auto mt-6 shadow-inner bg-blue-100 bg-opacity-95 rounded-full">
            <thead>
              <tr className="text-base text-blue-800">
                <th>Score</th>
                {budget ? <th>Budget</th> : undefined}
                {revenue ? <th>Recette</th> : undefined}
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm text-blue-600">
                <td className="text-center">{`${vote_average * 10}%`}</td>
                {budget ? (
                  <td className="text-center">{formatNumber(budget)}</td>
                ) : undefined}
                {revenue ? (
                  <td className="flex flex-row w-max mx-auto">
                    <p>{formatNumber(revenue)}</p>
                    {budget > 0 ? (
                      <div
                        className={`flex flex-row ml-2 items-center ${
                          revenue < budget
                            ? "text-red-600"
                            : revenue < 1.5 * budget
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {revenue < budget ? (
                          <IoArrowDownCircle />
                        ) : (
                          <IoArrowUpCircle />
                        )}
                        <p className="ml-0.5 text-xs">
                          {`${Math.round((revenue / budget - 1) * 100)}%`}
                        </p>
                      </div>
                    ) : undefined}
                  </td>
                ) : undefined}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Background>
  ) : null;

export default HeadBand;
