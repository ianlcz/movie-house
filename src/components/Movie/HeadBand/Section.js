const Section = ({ title, content }) =>
  content.length > 0 ? (
    <div className={title === "Un film de" ? "my-4 lg:mt-0 lg:mb-6" : "mt-6"}>
      <p className="font-medium text-blue-100 text-center mb-2">{title}</p>
      <ul
        className={`flex flex-row flex-wrap justify-evenly w-full ${
          content.length <= 2 ? "lg:w-3/5" : "lg:w-4/5"
        } mx-auto`}
      >
        {content.map((c) => (
          <li key={c.id} className="flex flex-row items-center">
            {c.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
                alt={`Profil de : ${c.name}`}
                className="mr-2 rounded-full w-8 h-8 object-cover shadow"
              />
            ) : undefined}
            <p className="text-sm">
              <span className="font-light">
                {c.name.split(" ").slice(0, -1).join(" ")}
              </span>
              <span className="ml-1 font-medium">
                {c.name.split(" ").slice(-1)}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  ) : null;

export default Section;
