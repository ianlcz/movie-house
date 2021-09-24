import { useEffect, useState } from "react";

const Pane = ({ movies }) => {
  const [informations, setInformations] = useState([]);

  useEffect(() => {
    const today = new Date();

    setInformations(
      movies
        .map((m) =>
          today.getTime() > new Date(m.release_date).getTime()
            ? new Date(m.release_date).getFullYear()
            : "Prochainement"
        )
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((y) =>
          Object({
            year: y,
            movies: movies.filter((m) =>
              y === "Prochainement"
                ? today.getTime() < new Date(m.release_date).getTime()
                : new Date(m.release_date).getFullYear() === y &&
                  today.getTime() > new Date(m.release_date).getTime()
            ),
          })
        )
    );
  }, [movies]);

  return (
    <ul>
      {informations.map((i) => (
        <li className="flex flex-row mb-6 last:mb-0">
          <p className="flex items-center justify-center font-bold w-1/5 rounded-l-xl bg-gradient-to-br from-blue-900 to-blue-400 text-white shadow">
            {i.year}
          </p>

          <ul className="w-max px-8 py-4 rounded-r-xl bg-white truncate overflow-ellipsis shadow">
            {i.movies.map((m) => (
              <li className="mb-3 last:mb-0">
                <div className="flex flex-row items-center">
                  <a
                    className="font-semibold min-w-max mr-2"
                    href={`/movie/${m.title.toLowerCase()}?year=${String(
                      new Date(m.release_date).getFullYear()
                    )}`}
                  >
                    {m.title}
                  </a>

                  {m.vote_average > 0 ? (
                    <p
                      className={`px-2 rounded-full text-sm font-medium ${
                        m.vote_average < 5
                          ? "text-red-500 bg-red-100"
                          : m.vote_average < 7.5
                          ? "text-yellow-500 bg-yellow-100"
                          : "text-green-500 bg-green-100"
                      }`}
                    >
                      {m.vote_average * 10}%
                    </p>
                  ) : undefined}
                </div>

                {m.character ? (
                  <div className="flex flex-row">
                    <span className="mr-2 text-blue-500">incarnant</span>
                    <p className="min-w-max">{m.character}</p>
                  </div>
                ) : undefined}

                {m.job ? <p>{m.job}</p> : undefined}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Pane;
