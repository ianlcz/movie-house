import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListPage from "./screens/ListPage";
import Login from "./screens/Login";
import MovieDetail from "./screens/MovieDetail";
import Register from "./screens/Register";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <ListPage />
      </Route>
      <Route path="/movie/:title">
        <MovieDetail />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  </Router>
);

export default App;
