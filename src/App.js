import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContext from "./auth/AuthContext";
import { getCookieFromBrowser } from "./auth/cookies";
import ListPage from "./screens/ListPage";
import Login from "./screens/Login";
import MovieDetail from "./screens/MovieDetail";
import Register from "./screens/Register";

const App = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <ListPage /> : <Login />}
        </Route>
        <Route path="/movie/:title">
          <MovieDetail />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
