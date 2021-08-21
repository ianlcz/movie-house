import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListPage from "./screens/ListPage";
import MovieDetail from "./screens/MovieDetail";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <ListPage />
      </Route>
      <Route path="/movie/:title">
        <MovieDetail />
      </Route>
    </Switch>
  </Router>
);

export default App;
