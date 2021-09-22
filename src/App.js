import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Read from "./screens/movie/read";
import Create from "./screens/movie/create";
import Update from "./screens/movie/update";
import Delete from "./screens/movie/delete";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        {localStorage.getItem("authToken") ? <Home /> : <Login />}
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <ProtectedRoute exact path="/movie/:title" component={Read} />
      <ProtectedRoute exact path="/new" component={Create} />
      <ProtectedRoute exact path="/edit/:reference/:title" component={Update} />
      <ProtectedRoute
        exact
        path="/delete/:reference/:title"
        component={Delete}
      />
    </Switch>
  </Router>
);

export default App;
