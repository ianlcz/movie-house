import Section from "./Section";

const Body = ({
  children: { name, birthday, deathday, place_of_birth, biography },
}) => {
  const today = new Date();

  return (
    <div className="w-3/4 mt-6 lg:mt-0 text-blue-800">
      <h1 className="w-max mx-auto px-4 text-2xl font-semibold text-white bg-gradient-to-br from-blue-900 to-blue-500 rounded-full shadow-inner">
        {name}
      </h1>

      <p className="w-max mx-auto mt-2 text-base text-blue-500">
        {deathday
          ? `(${new Date(birthday).getFullYear()} - ${new Date(
              deathday
            ).getFullYear()})`
          : `(${
              today.getMonth() < new Date(birthday).getMonth() ||
              (today.getMonth() === new Date(birthday).getMonth() &&
                today.getDate() < new Date(birthday).getDate())
                ? today.getFullYear() - new Date(birthday).getFullYear() - 1
                : today.getFullYear() - new Date(birthday).getFullYear()
            } ans)`}
      </p>

      <p className="w-max mx-auto mt-2 mb-4 text-sm font-semibold ">
        {place_of_birth}
      </p>

      {biography ? (
        <Section title="Biographie">
          <p className="leading-snug font-light text-sm lg:text-base text-justify">
            {biography}
          </p>
        </Section>
      ) : undefined}
    </div>
  );
};

export default Body;
