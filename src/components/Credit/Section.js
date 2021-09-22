const Section = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="text-center lg:text-left text-xl mb-2 font-medium">
      {title}
    </h2>
    {children}
  </div>
);

export default Section;
