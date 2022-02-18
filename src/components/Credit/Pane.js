import { useEffect, useState } from "react";
import { isMobileOnly } from "react-device-detect";

const Pane = ({ movies, gender }) => {
  const [informations, setInformations] = useState([]);

  useEffect(() => {
    const today = new Date();

    setInformations(
      movies
        .map((m) =>
          today.getTime() > new Date(m.release_date).getTime()
            ? new Date(m.release_date).getFullYear()
            : "Prochainement",
        )
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((y) =>
          Object({
            year: y,
            movies: movies.filter((m) =>
              y === "Prochainement"
                ? today.getTime() < new Date(m.release_date).getTime()
                : new Date(m.release_date).getFullYear() === y &&
                  today.getTime() > new Date(m.release_date).getTime(),
            ),
          }),
        ),
    );
  }, [movies]);

  const traductions = [
    {
      en: "Director",
      fr: {
        1: "Réalisatrice",
        2: "Réalisateur",
        3: "Réalisatrice / Réalisateur",
      },
    },
    {
      en: "Executive Producer",
      fr: {
        1: "Productrice exécutive",
        2: "Producteur exécutif",
        3: "Productrice / Producteur exécutif",
      },
    },
    {
      en: "Producer",
      fr: {
        1: "Productrice",
        2: "Producteur",
        3: "Productrice / Producteur",
      },
    },
    {
      en: "Writer",
      fr: {
        1: "Écrivaine",
        2: "Écrivain",
        3: "Écrivain/e",
      },
    },
    {
      en: "Screenplay",
      fr: "Scénario",
    },
    {
      en: "Characters",
      fr: "Personnages",
    },
    {
      en: "Original Music Composer",
      fr: {
        1: "Compositrice de la musique originale",
        2: "Compositeur de la musique originale",
        3: "Compositrice / Compositeur de la musique originale",
      },
    },
    {
      en: "Music",
      fr: "Musique",
    },
  ];

  return (
    <ul>
      {informations.map((i, index) => (
        <li
          key={index}
          className="flex flex-col lg:flex-row mb-6 first:mt-4 last:mb-8"
        >
          <p className="flex items-center justify-center py-2 lg:py-0 lg:w-1/5 rounded-t-xl lg:rounded-t-none lg:rounded-l-xl font-bold bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow">
            {i.year}
          </p>

          <ul className="w-full lg:w-max rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl bg-white truncate overflow-ellipsis shadow">
            {i.movies.map((m) => (
              <li
                key={m.id}
                className="px-6 py-4 lg:px-8 lg:py-4 hover:bg-blue-100 hover:shadow-inner cursor-pointer"
              >
                <a
                  href={`/movie/${m.title.toLowerCase()}?year=${String(
                    new Date(m.release_date).getFullYear(),
                  )}`}
                >
                  <div className="flex flex-row items-center w-full text-sm lg:text-base font-medium truncate">
                    <span className="mr-4">{m.title}</span>

                    {m.vote_average > 0 ? (
                      <p
                        className={`ml-auto px-2 rounded-full text-xs lg:text-sm font-medium ${
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
                    <div className="flex flex-row text-sm lg:text-base">
                      <span className="mr-1 lg:mr-2 text-blue-500">
                        incarnant
                      </span>
                      <p className="w-max md:w-max lg:min-w-max truncate">
                        {isMobileOnly
                          ? m.character
                          : m.character.split(" / ").slice(0, 6).join(" / ")}
                      </p>
                    </div>
                  ) : undefined}
                  {m.job ? (
                    <p className="text-sm">
                      {traductions.filter((t) =>
                        m.job ? t.en === m.job : undefined,
                      )[0]
                        ? typeof traductions.filter((t) =>
                            m.job ? t.en === m.job : undefined,
                          )[0].fr === "object"
                          ? traductions.filter((t) =>
                              m.job ? t.en === m.job : undefined,
                            )[0].fr[gender]
                          : traductions.filter((t) =>
                              m.job ? t.en === m.job : undefined,
                            )[0].fr
                        : undefined}
                    </p>
                  ) : undefined}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Pane;
