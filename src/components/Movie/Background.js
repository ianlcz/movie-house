const Background = ({ data: { cover, title }, children }) => (
  <section className={`w-full h-auto mx-auto z-0 relative`}>
    {cover ? (
      <img
        src={cover}
        className={`w-full h-full object-cover ${
          children._source.fileName.includes("/Pane.js")
            ? "rounded-2xl"
            : undefined
        } z-0 absolute`}
        alt={`Couverture ${
          children._source.fileName.includes("/Pane.js")
            ? "de la collection"
            : "du film"
        } : ${title}`}
      />
    ) : undefined}

    <div
      className={`top-0 left-0 w-full h-full
      ${
        children._source.fileName.includes("/Pane.js")
          ? `py-12 shadow-inner rounded-2xl bg-blue-600 ${
              cover ? "bg-opacity-50" : undefined
            }`
          : `px-8 py-6 text-white bg-blue-900 ${
              cover ? "bg-opacity-70" : undefined
            }`
      } z-10 relative`}
    >
      {children}
    </div>
  </section>
);

export default Background;
