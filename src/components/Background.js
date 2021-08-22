const Background = ({ data: { cover, title }, children }) => {
  return (
    <section className={`w-full h-auto mx-auto z-0 relative`}>
      {cover ? (
        <img
          src={cover}
          className="w-full h-full object-cover rounded-2xl z-0 absolute"
          alt={`Couverture de la Collection : ${title}`}
        />
      ) : undefined}

      <div
        className={`top-0 left-0 w-full h-full py-12 shadow-inner rounded-2xl bg-blue-600 ${
          cover ? "bg-opacity-50" : undefined
        } z-10 relative`}
      >
        {children}
      </div>
    </section>
  );
};

export default Background;
