import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import routes from "./routes";

const App = () => (
  <Switch>
    {routes.map((r) =>
      r.isProtected ? (
        <ProtectedRoute exact path={r.path} component={r.component} />
      ) : (
        <Route exact path={r.path} component={r.component} />
      ),
    )}
  </Switch>
);

export default App;
