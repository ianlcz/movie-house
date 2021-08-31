import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../auth/AuthContext";

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
    <div className="flex flex-col">
      <h1>Connexion</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Entrez votre email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          required
          className="w-max border"
        />
        <input
          type="password"
          name="password"
          autoComplete="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-max border"
        />

        <div>
          <button type="submit">Connexion</button>
        </div>

        <div className="flex items-center text-xs">
          <p className="mr-1.5 font-semibold">
            Vous n'avez pas de compte ?
          </p>

          <a
            className="hover:underline cursor-pointer"
            href="/register"
          >
            {`Créer un compte`}
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
