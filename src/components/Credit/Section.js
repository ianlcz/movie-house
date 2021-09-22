const Section = ({ title, children }) => (
  <>
    <h2 className="text-center lg:text-left text-xl mb-2 font-medium">
      {title}
    </h2>
    {children}
  </>
);

export default Section;
