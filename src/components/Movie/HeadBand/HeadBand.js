import { isMobileOnly } from "react-device-detect";
import Background from "../Background";
import ReadingTime from "./ReadingTime";
import Section from "./Section";
import Score from "./Score";
import Poster from "../../Poster";

const HeadBand = ({
  children: {
    detail: {
      ref,
      backdrop_path,
      original_title,
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
      <div className="flex flex-col lg:flex-row mt-4 mb-14 items-center justify-evenly">
        <Poster>{{ poster_path, title }}</Poster>

        <div className="flex flex-col w-full lg:w-3/5 mt-6 lg:mt-0">
          {ref ? (
            <p className="w-16 mx-auto mb-2 px-2 py-0.5 text-xs text-center font-semibold rounded-full shadow-inner bg-gradient-to-br from-blue-800 to-blue-500">
              {ref}
            </p>
          ) : undefined}

          <h1 className="flex flex-row w-full items-center justify-center text-center flex-wrap text-2xl lg:text-4xl font-semibold">
            {title}
            <span className="ml-2 lg:ml-4 text-base lg:text-2xl font-light">
              ({new Date(release_date).getFullYear()})
            </span>
          </h1>

          {original_title.toLowerCase() !== title.toLowerCase() ? (
            <p className="mt-2 text-sm italic text-center">{original_title}</p>
          ) : undefined}

          <div className="flex flex-row items-center lg:w-max mx-auto mt-2 lg:mt-0">
            {genres && (
              <>
                <ul className="flex flex-row">
                  {isMobileOnly
                    ? genres.slice(0, 2).map((g, index) => (
                        <li
                          key={g.name}
                          className={`ml-1 ${
                            index === 1 ? "lg:truncate" : undefined
                          }`}
                        >
                          <p className="text-sm lg:text-base">
                            {g.name}
                            {index === 1 ? undefined : ", "}
                          </p>
                        </li>
                      ))
                    : genres.map((g, index) => (
                        <li
                          key={g.name}
                          className={`ml-1 ${
                            index === genres.length - 1
                              ? "lg:truncate"
                              : undefined
                          }`}
                        >
                          <p className="text-sm lg:text-base">
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

          <Section title="Un film de" content={directors} />

          {tagline ? (
            <p className="mb-2 text-blue-100 font-medium text-sm italic">
              {tagline}
            </p>
          ) : undefined}

          {overview ? (
            <>
              <h2 className="text-center lg:text-left text-xl mb-2 font-medium">
                Synopsis
              </h2>
              <p className="leading-snug font-light text-sm lg:text-base text-justify">
                {overview}
              </p>
            </>
          ) : undefined}

          <Section title="Bande originale de" content={compositors} />

          <Score>{{ vote_average, budget, revenue }}</Score>
        </div>
      </div>
    </Background>
  ) : null;

export default HeadBand;
