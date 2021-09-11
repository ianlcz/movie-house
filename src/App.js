import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
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
      <Route exact path="/register">
        <Register />
      </Route>
      <ProtectedRoute exact path="/movie/:title" component={MovieDetail} />
      <ProtectedRoute exact path="/new" component={NewMovie} />
      <ProtectedRoute
        exact
        path="/edit/:reference/:title"
        component={EditMovie}
      />
      <ProtectedRoute
        exact
        path="/delete/:reference/:title"
        component={DeleteMovie}
      />
    </Switch>
  </Router>
);

export default App;
