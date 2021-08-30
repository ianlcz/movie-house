import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/account/register", {
        emailAddress,
        password,
        confirmPassword,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err.message));

    history.push("/");
  };

  return (
    <div className="flex flex-col">
      <h1>Inscription</h1>

      <form className="mt-8 space-y-6 -space-y-px" onSubmit={handleRegister}>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-max border"
        />

        <div>
          <button type="submit">Créer mon compte</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
