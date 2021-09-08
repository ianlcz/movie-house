import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DeleteMovie from "./screens/DeleteMovie";
import EditMovie from "./screens/EditMovie";
import ListPage from "./screens/ListPage";
import Login from "./screens/Login";
import MovieDetail from "./screens/MovieDetail";
import NewMovie from "./screens/NewMovie";
import Register from "./screens/Register";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        {localStorage.getItem("authToken") ? <ListPage /> : <Login />}
      </Route>
      <Route path="/movie/:title">
        <MovieDetail />
      </Route>
      <Router exact path="/new">
        <NewMovie />
      </Router>
      <Router exact path="/edit">
        <EditMovie />
      </Router>
      <Router exact path="/delete">
        <DeleteMovie />
      </Router>
      <Route exact path="/register">
        <Register />
      </Route>
    </Switch>
  </Router>
);

export default App;
