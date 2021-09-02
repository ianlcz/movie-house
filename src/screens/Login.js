import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import TitlePage from "../components/TitlePage";

const Login = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    login(emailAddress, password);
    history.push("/");
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-900 to-blue-400 min-h-screen">
      <div className="w-1/3 mx-auto my-auto py-8 bg-blue-50 rounded-xl shadow-lg">
        <h2 className="font-semibold text-2xl text-center text-blue-900">
          Connexion
        </h2>

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
              className="mb-4 px-4 py-1 text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
            />
            <input
              type="password"
              name="password"
              autoComplete="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-4 px-4 py-1 text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
            />
          </div>

          <div className="w-max mx-auto">
            <button
              type="submit"
              className="mt-4 mb-6 px-4 text-sm py-1 bg-gradient-to-tr from-blue-800 to-blue-400 hover:from-blue-400 hover:to-blue-800 font-medium text-blue-50 rounded-full"
            >
              Accéder à ma collection
            </button>
          </div>

          <div className="flex items-center text-xs w-max mx-auto">
            <p className="mr-1.5 font-semibold text-blue-800">
              Vous n'avez pas de compte ?
            </p>

            <a
              className="text-blue-600 hover:underline cursor-pointer"
              href="/register"
            >
              {`Créer un compte`}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
