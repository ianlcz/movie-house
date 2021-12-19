import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import { Helmet } from "react-helmet";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(emailAddress, password);
    window.location.reload(false);
  };

  return (
    <>
      <Helmet>
        <title>{`Connexion | Movie House`}</title>
      </Helmet>
      <div className="h-screen lg:min-h-screen flex flex-col bg-gradient-to-br from-green-800 to-green-400">
        <div className="w-11/12 lg:w-1/3 mx-auto my-auto py-8 bg-green-50 rounded-xl shadow-lg">
          <h1 className="font-semibold text-2xl text-center text-green-900">
            Connexion
          </h1>

          <form onSubmit={handleLogin}>
            <div className="flex flex-col w-max mx-auto mt-6">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Votre adresse e-mail"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
                className="mb-4 px-4 py-1 text-green-400 border-2 border-green-200 placeholder-green-200 rounded-full font-semibold shadow-inner"
              />
              <input
                type="password"
                name="password"
                autoComplete="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-4 px-4 py-1 text-green-400 border-2 border-green-200 placeholder-green-200 rounded-full font-semibold shadow-inner"
              />
            </div>

            <div className="w-max mx-auto">
              <button
                type="submit"
                className="mt-4 mb-6 px-4 text-sm py-1 bg-gradient-to-tr from-green-800 to-green-400 hover:from-green-400 hover:to-green-800 font-medium text-green-50 rounded-full"
              >
                Accéder à ma collection
              </button>
            </div>

            <div className="flex items-center text-xs w-max mx-auto">
              <p className="mr-1.5 font-semibold text-green-800">
                Vous n'avez pas de compte ?
              </p>

              <a
                className="text-green-600 hover:underline cursor-pointer"
                href="/register"
              >
                {`Créer un compte`}
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
