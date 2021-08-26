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

      <form className="mt-8 space-y-6 -space-y-px" onSubmit={handleLogin}>
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
      </form>
    </div>
  );
};

export default Login;
