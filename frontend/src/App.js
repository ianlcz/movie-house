import ListPage from "./screens/ListPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route path="/">
        <ListPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
