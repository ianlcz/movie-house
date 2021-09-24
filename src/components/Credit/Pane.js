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
    <ul className="w-full mx-auto mt-6">
      {informations.map((i) => (
        <li className="grid grid-flow-col grid-cols-2 mb-10 last:mb-0">
          <p className="border flex items-center justify-center w-2/4">
            {i.year}
          </p>

          <ul>
            {i.movies.map((m) => (
              <li className="border w-full px-6">
                <div className="flex flex-row">
                  <a
                    className="inline font-semibold"
                    href={`/movie/${m.title.toLowerCase()}?year=${String(
                      new Date(m.release_date).getFullYear()
                    )}`}
                  >
                    {m.title}
                  </a>

                  {m.character ? (
                    <p>
                      <span className="mx-2">incarnant</span>
                      {m.character}
                    </p>
                  ) : undefined}

                  {m.job ? <p>{m.job}</p> : undefined}
                </div>

                {m.vote_average > 0 ? <p>{m.vote_average * 10}%</p> : undefined}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Pane;
