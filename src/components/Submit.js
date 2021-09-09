const Submit = ({ buttonTitle }) => (
  <div className="flex mx-auto mt-6 justify-evenly">
    <button
      type="submit"
      className="px-4 text-sm py-1 bg-gradient-to-tr from-blue-800 to-blue-400 hover:from-blue-400 hover:to-blue-800 font-medium text-blue-50 rounded-full"
    >
      {buttonTitle}
    </button>

    <a
      href="/"
      className="px-4 text-sm py-1 bg-gradient-to-tr from-red-800 to-red-400 hover:from-red-400 hover:to-red-800 font-medium text-red-50 rounded-full"
    >
      Annuler
    </a>
  </div>
);

export default Submit;
