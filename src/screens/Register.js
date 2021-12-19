import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
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
    <>
      <Helmet>
        <title>{`Inscription | Movie House`}</title>
      </Helmet>
      <div className="flex flex-col bg-gradient-to-br from-green-800 to-green-400 min-h-screen">
        <div className="w-5/6 lg:w-2/5 mx-auto my-auto p-8 bg-green-50 rounded-xl shadow-lg">
          <h1 className="font-semibold text-2xl text-center text-green-900">
            Inscription
          </h1>

          <form onSubmit={handleRegister}>
            <div className="flex flex-col w-auto mx-auto mt-6">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Entrez votre email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
                className="w-max mx-auto mb-4 px-4 py-1 text-sm text-green-400 border-2 border-green-200 placeholder-green-200 rounded-full font-semibold shadow-inner"
              />

              <div className="flex flex-col lg:flex-row mb-4">
                <input
                  type="password"
                  name="password"
                  autoComplete="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-max mx-auto mb-2 lg:mr-4 px-4 py-1 text-sm text-green-400 border-2 border-green-200 placeholder-green-200 rounded-full font-semibold shadow-inner"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmation de votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-max mx-auto px-4 py-1 text-sm text-green-400 border-2 border-green-200 placeholder-green-200 rounded-full font-semibold shadow-inner"
                />
              </div>
            </div>

            <div className="w-max mx-auto">
              <button
                type="submit"
                className="mt-4 px-4 text-sm py-1 bg-gradient-to-tr from-green-800 to-green-400 hover:from-green-400 hover:to-green-800 font-medium text-green-50 rounded-full"
              >
                Créer mon compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
